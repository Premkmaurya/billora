const Customer = require("../models/customer.model");
const customerRepository = require("../repositories/customer.repository");

const normalizeCustomerName = (name) =>
  String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildCustomerPayload = (input, organizationId) => {
  const normalizedName = normalizeCustomerName(input.name);

  return {
    ...input,
    organizationId,
    normalizedName,
    isActive: input.isActive !== false,
  };
};

const getCustomers = async (params) => {
  return customerRepository.findCustomers(params);
};

const getCustomerById = async ({ id, organizationId }) => {
  const customer = await customerRepository.findCustomerById({ id, organizationId });
  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }
  return customer;
};

const createCustomer = async ({ input, organizationId }) => {
  const payload = buildCustomerPayload(input, organizationId);
  const existing = await Customer.findOne({ organizationId, phone: payload.phone }).lean();

  if (payload.phone && existing) {
    const error = new Error("Phone number must be unique within the organization");
    error.statusCode = 409;
    throw error;
  }

  return customerRepository.createCustomer(payload);
};

const updateCustomer = async ({ id, organizationId, input }) => {
  const existing = await customerRepository.findCustomerById({ id, organizationId });
  if (!existing) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  const payload = buildCustomerPayload({ ...existing.toObject(), ...input }, organizationId);

  if (payload.phone && payload.phone !== existing.phone) {
    const duplicate = await Customer.findOne({ organizationId, phone: payload.phone, _id: { $ne: id } }).lean();
    if (duplicate) {
      const error = new Error("Phone number must be unique within the organization");
      error.statusCode = 409;
      throw error;
    }
  }

  return customerRepository.updateCustomer({ id, organizationId, payload });
};

const deleteCustomer = async ({ id, organizationId }) => {
  const existing = await customerRepository.findCustomerById({ id, organizationId });
  if (!existing) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    throw error;
  }

  return customerRepository.softDeleteCustomer({ id, organizationId });
};

const getCustomerInvoices = async ({ id, organizationId }) => {
  const customer = await getCustomerById({ id, organizationId });
  return {
    customer,
    invoices: [],
  };
};

const getCustomerOutstanding = async ({ id, organizationId }) => {
  const customer = await getCustomerById({ id, organizationId });
  return {
    customer,
    outstanding: 0,
  };
};

const importCustomers = async ({ organizationId, customers }) => {
  const created = [];
  for (const item of customers) {
    const payload = buildCustomerPayload(item, organizationId);
    const customer = await customerRepository.createCustomer(payload);
    created.push(customer);
  }
  return created;
};

const exportCustomers = async ({ organizationId }) => {
  return Customer.find({ organizationId, isActive: true }).lean();
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerInvoices,
  getCustomerOutstanding,
  importCustomers,
  exportCustomers,
};
