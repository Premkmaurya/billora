const customerModel = require("../models/customer.model");

const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({ success: false, message, errors });
};

const getCustomers = async (req, res) => {
  try {
    const result = await customerModel.find({
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customers fetched successfully", result);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to fetch customers",
    );
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.findById({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customer fetched successfully", customer);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to fetch customer",
    );
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = await customerModel.create({
      ...req.body,
      organizationId: req.user?.organizationId || req.body.organizationId,
    });

    return sendSuccess(res, 201, "Customer created successfully", customer);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to create customer",
    );
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customer = await customerModel.findByIdAndUpdate({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.body.organizationId,
      payload: req.body,
    });

    return sendSuccess(res, 200, "Customer updated successfully", customer);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to update customer",
    );
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customer = await customerModel.findByIdAndDelete({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Customer deleted successfully", customer);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to delete customer",
    );
  }
};

const searchCustomers = async (req, res) => {
  try {
    const result = await customerModel.find({
      organizationId: req.user?.organizationId || req.query.organizationId,
      $or: [
        { name: { $regex: req.query.q || req.query.search, $options: "i" } },
        { email: { $regex: req.query.q || req.query.search, $options: "i" } },
      ],
    });

    return sendSuccess(res, 200, "Customers searched successfully", result);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to search customers",
    );
  }
};


module.exports = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
};
