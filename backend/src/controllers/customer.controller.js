const customerService = require("../services/customer.service");

const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({ success: false, message, errors });
};

const getCustomers = async (req, res) => {
  try {
    const result = await customerService.getCustomers({
      organizationId: req.user?.organizationId || req.query.organizationId,
      search: req.query.search || req.query.q,
      isActive: req.query.isActive === undefined ? true : req.query.isActive === "true",
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      sortBy: req.query.sortBy || "createdAt",
      sortOrder: req.query.sortOrder || "desc",
    });

    return sendSuccess(res, 200, "Customers fetched successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to fetch customers");
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await customerService.getCustomerById({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customer fetched successfully", customer);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to fetch customer");
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer({
      input: req.body,
      organizationId: req.user?.organizationId || req.body.organizationId,
    });

    return sendSuccess(res, 201, "Customer created successfully", customer);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to create customer");
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await customerService.updateCustomer({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.body.organizationId,
      input: req.body,
    });

    return sendSuccess(res, 200, "Customer updated successfully", customer);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to update customer");
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await customerService.deleteCustomer({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customer deleted successfully", customer);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to delete customer");
  }
};

const searchCustomers = async (req, res) => {
  try {
    const result = await customerService.getCustomers({
      organizationId: req.user?.organizationId || req.query.organizationId,
      search: req.query.q || req.query.search,
      isActive: req.query.isActive === undefined ? true : req.query.isActive === "true",
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      sortBy: req.query.sortBy || "createdAt",
      sortOrder: req.query.sortOrder || "desc",
    });

    return sendSuccess(res, 200, "Customers searched successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to search customers");
  }
};

const getCustomerInvoices = async (req, res) => {
  try {
    const result = await customerService.getCustomerInvoices({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customer invoices fetched successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to fetch customer invoices");
  }
};

const getCustomerOutstanding = async (req, res) => {
  try {
    const result = await customerService.getCustomerOutstanding({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customer outstanding fetched successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to fetch customer outstanding");
  }
};

const importCustomers = async (req, res) => {
  try {
    const customers = await customerService.importCustomers({
      organizationId: req.user?.organizationId || req.body.organizationId,
      customers: req.body.customers || [],
    });

    return sendSuccess(res, 201, "Customers imported successfully", customers);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to import customers");
  }
};

const exportCustomers = async (req, res) => {
  try {
    const customers = await customerService.exportCustomers({
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customers exported successfully", customers);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to export customers");
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
  getCustomerInvoices,
  getCustomerOutstanding,
  importCustomers,
  exportCustomers,
};
