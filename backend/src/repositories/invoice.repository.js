const Invoice = require("../models/invoice.model");
const InvoiceItem = require("../models/invoiceItem.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

const buildInvoiceQuery = ({ organizationId, search }) => {
  const query = { organizationId };

  if (search) {
    const searchable = search.trim();
    query.$or = [
      { invoiceNumber: { $regex: searchable, $options: "i" } },
      { notes: { $regex: searchable, $options: "i" } },
    ];
  }

  return query;
};

const findInvoices = async ({ organizationId, search, page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc" }) => {
  const query = buildInvoiceQuery({ organizationId, search });
  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [invoices, total] = await Promise.all([
    Invoice.find(query).sort(sort).skip(skip).limit(limit).populate("customerId", "name phone"),
    Invoice.countDocuments(query),
  ]);

  return {
    invoices,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const findInvoiceById = async ({ id, organizationId }) => {
  return Invoice.findOne({ _id: id, organizationId })
    .populate("customerId", "name phone")
    .populate({ path: "items", model: "InvoiceItem" });
};

const createInvoice = async (payload, items) => {
  const invoice = await Invoice.create(payload);
  const preparedItems = items.map((item) => ({ ...item, invoiceId: invoice._id }));
  await InvoiceItem.insertMany(preparedItems);
  return invoice;
};

const updateInvoice = async ({ id, organizationId, payload }) => {
  return Invoice.findOneAndUpdate(
    { _id: id, organizationId },
    { $set: payload },
    { new: true, runValidators: true }
  );
};

const markCancelled = async ({ id, organizationId }) => {
  return Invoice.findOneAndUpdate(
    { _id: id, organizationId },
    { $set: { status: "CANCELLED" } },
    { new: true }
  );
};

const createInvoiceNumber = async (organizationId) => {
  const count = await Invoice.countDocuments({ organizationId });
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

module.exports = {
  findInvoices,
  findInvoiceById,
  createInvoice,
  updateInvoice,
  markCancelled,
  createInvoiceNumber,
  getProductsForInvoice,
  updateProductStock,
  updateCustomerAfterInvoice,
};
