const Invoice = require("../models/invoice.model");
const InvoiceItem = require("../models/invoiceItem.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

const normalizeInvoiceOutput = (invoice) => {
  if (!invoice) return invoice;
  const doc = typeof invoice.toObject === "function" ? invoice.toObject() : invoice;
  if (doc._id && !doc.id) {
    doc.id = String(doc._id);
  }
  if (doc.customerId && typeof doc.customerId === "object" && doc.customerId.name) {
    doc.customerName = doc.customerId.name;
    doc.customerPhone = doc.customerId.phone;
  }
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
      .populate("customerId", "name phone")
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

  const invoices = invoicesRaw.map(normalizeInvoiceOutput);
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
  const invoice = await Invoice.findOne({ _id: id, organizationId: String(organizationId) })
    .populate("customerId", "name phone")
    .populate({ path: "items", model: "InvoiceItem" })
    .lean();
  return normalizeInvoiceOutput(invoice);
};

const createInvoice = async (payload, items = []) => {
  const invoice = await Invoice.create(payload);
  if (items && items.length > 0) {
    const preparedItems = items.map((item) => ({ ...item, invoiceId: invoice._id }));
    await InvoiceItem.insertMany(preparedItems);
  }
  const populated = await Invoice.findById(invoice._id).populate("customerId", "name phone").lean();
  return normalizeInvoiceOutput(populated);
};

const updateInvoice = async ({ id, organizationId, payload }) => {
  const invoice = await Invoice.findOneAndUpdate(
    { _id: id, organizationId: String(organizationId) },
    { $set: payload },
    { new: true, runValidators: true }
  )
    .populate("customerId", "name phone")
    .lean();
  return normalizeInvoiceOutput(invoice);
};

const markCancelled = async ({ id, organizationId }) => {
  const invoice = await Invoice.findOneAndUpdate(
    { _id: id, organizationId: String(organizationId) },
    { $set: { status: "CANCELLED" } },
    { new: true }
  )
    .populate("customerId", "name phone")
    .lean();
  return normalizeInvoiceOutput(invoice);
};

const deleteInvoice = async ({ id, organizationId }) => {
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
};
