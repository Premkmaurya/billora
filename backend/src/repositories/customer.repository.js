const Customer = require("../models/customer.model");

const normalizeCustomerOutput = (customer) => {
  if (!customer) return customer;
  const doc = typeof customer.toObject === "function" ? customer.toObject() : customer;
  if (doc._id && !doc.id) {
    doc.id = String(doc._id);
  }
  return doc;
};

const buildCustomerQuery = async ({ organizationId, q, search, active, isActive, city }) => {
  const query = { organizationId: String(organizationId) };

  const searchQuery = (q || search || "").trim();
  if (searchQuery) {
    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { phone: { $regex: searchQuery, $options: "i" } },
      { email: { $regex: searchQuery, $options: "i" } },
      { gstNumber: { $regex: searchQuery, $options: "i" } },
      { address: { $regex: searchQuery, $options: "i" } },
    ];
  }

  const activeVal = active !== undefined ? active : isActive;
  if (activeVal !== undefined && activeVal !== null && activeVal !== "") {
    if (typeof activeVal === "boolean") {
      query.isActive = activeVal;
    } else if (typeof activeVal === "string") {
      const lower = activeVal.toLowerCase();
      if (lower === "active" || lower === "true") {
        query.isActive = true;
      } else if (lower === "inactive" || lower === "false") {
        query.isActive = false;
      }
    }
  }

  if (city && typeof city === "string" && city.trim()) {
    query.address = { $regex: city.trim(), $options: "i" };
  }

  return query;
};

const findCustomers = async ({
  organizationId,
  q,
  search,
  active,
  isActive,
  city,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, parseInt(limit) || 10);
  const skipNum = (pageNum - 1) * limitNum;

  const validSortBy = ["name", "phone", "email", "createdAt"].includes(sortBy) ? sortBy : "createdAt";
  const sort = { [validSortBy]: sortOrder === "asc" ? 1 : -1 };

  const query = await buildCustomerQuery({ organizationId, q, search, active, isActive, city });

  const [customersRaw, total, activeCustomers, inactiveCustomers] = await Promise.all([
    Customer.find(query).sort(sort).skip(skipNum).limit(limitNum).lean(),
    Customer.countDocuments(query),
    Customer.countDocuments({ organizationId: String(organizationId), isActive: true }),
    Customer.countDocuments({ organizationId: String(organizationId), isActive: false }),
  ]);

  const customers = customersRaw.map(normalizeCustomerOutput);
  const totalPages = Math.ceil(total / limitNum) || (total === 0 ? 0 : 1);

  return {
    customers,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1 && pageNum <= totalPages,
    },
    stats: {
      totalCustomers: activeCustomers + inactiveCustomers,
      activeCustomers,
      inactiveCustomers,
    },
  };
};

const findCustomerById = async ({ id, organizationId }) => {
  const customer = await Customer.findOne({ _id: id, organizationId: String(organizationId) }).lean();
  return normalizeCustomerOutput(customer);
};

const createCustomer = async (payload) => {
  const customer = await Customer.create(payload);
  return normalizeCustomerOutput(customer.toObject());
};

const updateCustomer = async ({ id, organizationId, payload }) => {
  const customer = await Customer.findOneAndUpdate(
    { _id: id, organizationId: String(organizationId) },
    { $set: payload },
    { new: true, runValidators: true }
  ).lean();
  return normalizeCustomerOutput(customer);
};

const softDeleteCustomer = async ({ id, organizationId }) => {
  return Customer.findOneAndDelete({ _id: id, organizationId: String(organizationId) });
};

const searchCustomers = async (params) => {
  return findCustomers(params);
};

module.exports = {
  findCustomers,
  findCustomerById,
  createCustomer,
  updateCustomer,
  softDeleteCustomer,
  searchCustomers,
  normalizeCustomerOutput,
};
