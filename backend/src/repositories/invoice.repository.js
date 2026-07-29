const Invoice = require("../models/invoice.model");
const InvoiceItem = require("../models/invoiceItem.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

const getItemsForInvoice = async (invoiceId) => {
  const items = await InvoiceItem.find({ invoiceId })
    .populate("productId", "name sellingPrice price taxRate gstRate sku hsnCode")
    .lean();

  return items.map((item) => {
    const product = item.productId && typeof item.productId === "object" ? item.productId : null;
    const productName = product?.name || item.productName || "Product Item";
    const unitPrice = Number(item.unitPrice ?? product?.sellingPrice ?? product?.price ?? 0);
    const gstRate = Number(item.gstRate ?? product?.gstRate ?? product?.taxRate ?? 0);
    const qty = Number(item.quantity ?? 1);
    const taxAmount = Number(item.taxAmount ?? (qty * unitPrice * gstRate) / 100);
    const total = Number(item.total ?? (qty * unitPrice + taxAmount));

    return {
      id: String(item._id),
      _id: String(item._id),
      invoiceId: String(item.invoiceId),
      productId: product ? String(product._id) : String(item.productId),
      productName,
      sku: product?.sku || item.sku || "",
      hsnCode: product?.hsnCode || item.hsnCode || "",
      quantity: qty,
      unitPrice,
      sellingPrice: unitPrice,
      taxRate: gstRate,
      gstRate,
      taxAmount,
      discount: Number(item.discount ?? 0),
      subtotal: qty * unitPrice,
      total,
      product: product ? { id: String(product._id), name: product.name, sku: product.sku || "" } : undefined,
    };
  });
};

const normalizeInvoiceOutput = (invoice) => {
  if (!invoice) return invoice;
  const doc = typeof invoice.toObject === "function" ? invoice.toObject() : invoice;
  if (doc._id && !doc.id) {
    doc.id = String(doc._id);
  }
  if (doc.customerId && typeof doc.customerId === "object") {
    doc.customer = doc.customerId;
    doc.customerName = doc.customerId.name || doc.customerName || "Walk-in Customer";
    doc.customerPhone = doc.customerId.phone || doc.customerPhone || "";
    doc.customerId = String(doc.customerId._id || doc.customerId);
  } else if (!doc.customerName) {
    doc.customerName = "Walk-in Customer";
  }

  doc.subtotal = Number(doc.subtotal ?? 0);
  doc.taxAmount = Number(doc.taxAmount ?? doc.taxTotal ?? 0);
  doc.taxTotal = doc.taxAmount;
  doc.cgst = Number((doc.taxAmount / 2).toFixed(2));
  doc.sgst = Number((doc.taxAmount / 2).toFixed(2));
  doc.discount = Number(doc.discountAmount ?? doc.discount ?? 0);
  doc.discountAmount = doc.discount;
  doc.grandTotal = Number(doc.totalAmount ?? doc.grandTotal ?? 0);
  doc.totalAmount = doc.grandTotal;
  doc.paidAmount = Number(doc.paidAmount ?? 0);
  doc.dueAmount = Number(doc.dueAmount ?? 0);
  doc.items = Array.isArray(doc.items) ? doc.items : [];

  return doc;
};

const buildInvoiceQuery = ({ organizationId, q, search, status, paymentStatus, customer, customerId, dateFrom, dateTo }) => {
  const query = { organizationId: String(organizationId) };

  const searchQuery = (q || search || "").trim();
  if (searchQuery) {
    query.$or = [
      { invoiceNumber: { $regex: searchQuery, $options: "i" } },
      { notes: { $regex: searchQuery, $options: "i" } },
    ];
  }

  if (status && typeof status === "string") {
    query.status = status.toUpperCase();
  }

  if (paymentStatus && typeof paymentStatus === "string") {
    query.paymentStatus = paymentStatus.toUpperCase();
  }

  const selectedCustomer = customerId || customer;
  if (selectedCustomer) {
    query.customerId = selectedCustomer;
  }

  if (dateFrom || dateTo) {
    query.createdAt = {};
    if (dateFrom) {
      const dFrom = new Date(dateFrom);
      if (!isNaN(dFrom.getTime())) {
        query.createdAt.$gte = dFrom;
      }
    }
    if (dateTo) {
      const dTo = new Date(dateTo);
      if (!isNaN(dTo.getTime())) {
        dTo.setHours(23, 59, 59, 999);
        query.createdAt.$lte = dTo;
      }
    }
  }

  return query;
};

const findInvoices = async ({
  organizationId,
  q,
  search,
  status,
  paymentStatus,
  customer,
  customerId,
  dateFrom,
  dateTo,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, parseInt(limit) || 10);
  const skipNum = (pageNum - 1) * limitNum;

  const validSortBy = ["invoiceNumber", "totalAmount", "paidAmount", "createdAt", "updatedAt"].includes(sortBy)
    ? sortBy
    : "createdAt";
  const sort = { [validSortBy]: sortOrder === "asc" ? 1 : -1 };

  const query = buildInvoiceQuery({
    organizationId,
    q,
    search,
    status,
    paymentStatus,
    customer,
    customerId,
    dateFrom,
    dateTo,
  });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const [
    invoicesRaw,
    total,
    paidInvoices,
    unpaidInvoices,
    todayInvoices,
    todayRevenueAgg,
  ] = await Promise.all([
    Invoice.find(query)
      .sort(sort)
      .skip(skipNum)
      .limit(limitNum)
      .populate("customerId", "name phone email address")
      .lean(),
    Invoice.countDocuments(query),
    Invoice.countDocuments({ organizationId: String(organizationId), paymentStatus: "PAID" }),
    Invoice.countDocuments({ organizationId: String(organizationId), paymentStatus: { $ne: "PAID" } }),
    Invoice.countDocuments({
      organizationId: String(organizationId),
      createdAt: { $gte: todayStart, $lte: todayEnd },
    }),
    Invoice.aggregate([
      {
        $match: {
          organizationId: String(organizationId),
          createdAt: { $gte: todayStart, $lte: todayEnd },
          status: { $ne: "CANCELLED" },
        },
      },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
  ]);

  const invoices = await Promise.all(
    invoicesRaw.map(async (inv) => {
      const normalized = normalizeInvoiceOutput(inv);
      normalized.items = await getItemsForInvoice(inv._id);
      return normalized;
    })
  );

  const totalPages = Math.ceil(total / limitNum) || (total === 0 ? 0 : 1);
  const todayRevenue = todayRevenueAgg[0]?.total || 0;

  return {
    invoices,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1 && pageNum <= totalPages,
    },
    stats: {
      totalInvoices: paidInvoices + unpaidInvoices,
      paidInvoices,
      unpaidInvoices,
      todayInvoices,
      todayRevenue,
    },
  };
};

const findInvoiceById = async ({ id, organizationId }) => {
  const rawInvoice = await Invoice.findOne({ _id: id, organizationId: String(organizationId) })
    .populate("customerId", "name phone email address")
    .lean();

  if (!rawInvoice) return null;

  const items = await getItemsForInvoice(rawInvoice._id);
  const normalized = normalizeInvoiceOutput(rawInvoice);
  normalized.items = items;
  return normalized;
};

const createInvoice = async (payload, items = []) => {
  const invoice = await Invoice.create(payload);
  if (items && items.length > 0) {
    const preparedItems = items.map((item) => ({ ...item, invoiceId: invoice._id }));
    await InvoiceItem.insertMany(preparedItems);
  }
  return findInvoiceById({ id: invoice._id, organizationId: payload.organizationId });
};

const updateInvoice = async ({ id, organizationId, payload }) => {
  const invoice = await Invoice.findOneAndUpdate(
    { _id: id, organizationId: String(organizationId) },
    { $set: payload },
    { new: true, runValidators: true }
  ).lean();

  if (!invoice) return null;
  return findInvoiceById({ id: invoice._id, organizationId });
};

const markCancelled = async ({ id, organizationId }) => {
  const invoice = await Invoice.findOneAndUpdate(
    { _id: id, organizationId: String(organizationId) },
    { $set: { status: "CANCELLED" } },
    { new: true }
  ).lean();

  if (!invoice) return null;
  return findInvoiceById({ id: invoice._id, organizationId });
};

const deleteInvoice = async ({ id, organizationId }) => {
  await InvoiceItem.deleteMany({ invoiceId: id });
  return Invoice.findOneAndDelete({ _id: id, organizationId: String(organizationId) });
};

const createInvoiceNumber = async (organizationId) => {
  const count = await Invoice.countDocuments({ organizationId: String(organizationId) });
  return `INV-${String(count + 1).padStart(4, "0")}`;
};

const getProductsForInvoice = async (productIds) => {
  return Product.find({ _id: { $in: productIds } }).lean();
};

const updateProductStock = async (productId, quantity) => {
  return Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } }, { new: true });
};

const updateCustomerAfterInvoice = async (customerId, amount) => {
  return Customer.findByIdAndUpdate(customerId, { $set: { lastPurchaseAt: new Date() } }, { new: true });
};

const searchInvoices = async (params) => {
  return findInvoices(params);
};

module.exports = {
  findInvoices,
  findInvoiceById,
  createInvoice,
  updateInvoice,
  markCancelled,
  deleteInvoice,
  createInvoiceNumber,
  getProductsForInvoice,
  updateProductStock,
  updateCustomerAfterInvoice,
  searchInvoices,
  normalizeInvoiceOutput,
  getItemsForInvoice,
};
