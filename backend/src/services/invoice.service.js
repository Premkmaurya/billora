const mongoose = require("mongoose");
const Invoice = require("../models/invoice.model");
const InvoiceItem = require("../models/invoiceItem.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");
const invoiceRepository = require("../repositories/invoice.repository");

const buildInvoiceNumber = async (organizationId) => {
  return invoiceRepository.createInvoiceNumber(organizationId);
};

const calculateInvoiceTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = items.reduce((sum, item) => sum + (item.discount || 0), 0);
  const taxAmount = items.reduce((sum, item) => sum + (item.taxAmount || 0), 0);
  const totalAmount = subtotal - discountAmount + taxAmount;
  const dueAmount = totalAmount;

  return { subtotal, discountAmount, taxAmount, totalAmount, dueAmount };
};

const resolveInvoiceItems = async (organizationId, items) => {
  const productIds = items.map((item) => item.productId);
  const products = await Product.find({ _id: { $in: productIds }, organizationId }).lean();
  const productMap = new Map(products.map((product) => [String(product._id), product]));

  const resolvedItems = [];
  for (const item of items) {
    const product = productMap.get(String(item.productId));
    if (!product) {
      const error = new Error("One or more products are invalid");
      error.statusCode = 404;
      throw error;
    }

    if (product.stock < item.quantity) {
      const error = new Error(`Insufficient stock for ${product.name}`);
      error.statusCode = 400;
      throw error;
    }

    const unitPrice = Number(product.sellingPrice);
    const gstRate = Number(product.gstRate || 0);
    const taxableAmount = unitPrice * item.quantity;
    const taxAmount = taxableAmount * (gstRate / 100);
    const discount = Number(item.discount || 0);
    const total = taxableAmount + taxAmount - discount;

    resolvedItems.push({
      productId: product._id,
      quantity: Number(item.quantity),
      unitPrice,
      discount,
      gstRate,
      taxAmount,
      total,
    });
  }

  return resolvedItems;
};

const createInvoice = async ({ organizationId, input }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const invoiceNumber = await buildInvoiceNumber(organizationId);
    const items = await resolveInvoiceItems(organizationId, input.items || []);
    const totals = calculateInvoiceTotals(items);

    const invoicePayload = {
      invoiceNumber,
      customerId: input.customerId || null,
      organizationId,
      subtotal: totals.subtotal,
      discountAmount: totals.discountAmount,
      taxAmount: totals.taxAmount,
      totalAmount: totals.totalAmount,
      paidAmount: Number(input.paidAmount || 0),
      dueAmount: totals.totalAmount - Number(input.paidAmount || 0),
      paymentMethod: input.paymentMethod || "CASH",
      paymentStatus: input.paymentStatus || "UNPAID",
      status: input.status || "COMPLETED",
      notes: input.notes || "",
    };

    const invoice = await invoiceRepository.createInvoice(invoicePayload, items);

    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } }, { session });
    }

    if (invoicePayload.customerId) {
      await Customer.findByIdAndUpdate(
        invoicePayload.customerId,
        {
          $set: { lastPurchaseAt: new Date() },
          $inc: { outstandingBalance: Math.max(0, invoicePayload.dueAmount) },
        },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();
    return invoice;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getInvoices = async (params) => {
  return invoiceRepository.findInvoices(params);
};

const getInvoiceById = async ({ id, organizationId }) => {
  const invoice = await invoiceRepository.findInvoiceById({ id, organizationId });
  if (!invoice) {
    const error = new Error("Invoice not found");
    error.statusCode = 404;
    throw error;
  }
  return invoice;
};

const cancelInvoice = async ({ id, organizationId }) => {
  const invoice = await invoiceRepository.findInvoiceById({ id, organizationId });
  if (!invoice) {
    const error = new Error("Invoice not found");
    error.statusCode = 404;
    throw error;
  }

  return invoiceRepository.markCancelled({ id, organizationId });
};

const duplicateInvoice = async ({ id, organizationId }) => {
  const invoice = await invoiceRepository.findInvoiceById({ id, organizationId });
  if (!invoice) {
    const error = new Error("Invoice not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    invoice,
    duplicate: true,
  };
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  cancelInvoice,
  duplicateInvoice,
};
