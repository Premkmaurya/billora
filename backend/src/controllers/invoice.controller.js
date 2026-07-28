const invoiceModel = require("../models/invoice.model");

const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({ success: false, message, errors });
};

const getInvoices = async (req, res) => {
  try {
    const result = await invoiceModel.find({
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Invoices fetched successfully", result);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to fetch invoices",
    );
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const invoice = await invoiceModel.findById({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Invoice fetched successfully", invoice);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to fetch invoice",
    );
  }
};

const createInvoice = async (req, res) => {
  try {
    const invoice = await invoiceModel.create({
      organizationId: req.user?.organizationId || req.body.organizationId,
      ...req.body,
    });

    return sendSuccess(res, 201, "Invoice created successfully", invoice);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to create invoice",
    );
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoice = await invoiceModel.findByIdAndUpdate({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
      payload: req.body,
    });

    return sendSuccess(res, 200, "Invoice updated successfully", invoice);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to update invoice",
    );
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoice = await invoiceModel.findByIdAndDelete({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Invoice deleted successfully", invoice);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to delete invoice",
    );
  }
};

const cancelInvoice = async (req, res) => {
  try {
    const invoice = await invoiceModel.findByIdAndUpdate({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
      payload: { status: "cancelled" },
    });

    return sendSuccess(res, 200, "Invoice cancelled successfully", invoice);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to cancel invoice",
    );
  }
};

const duplicateInvoice = async (req, res) => {
  try {
    const result = await invoiceModel.findById({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Invoice duplicated successfully", result);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to duplicate invoice",
    );
  }
};

const searchInvoices = async (req, res) => {
  try {
    const result = await invoiceModel.find({
      organizationId: req.user?.organizationId || req.query.organizationId,
      $or: [
        { title: { $regex: req.query.q, $options: "i" } },
        { description: { $regex: req.query.q, $options: "i" } },
      ],
    });

    return sendSuccess(res, 200, "Invoices searched successfully", result);
  } catch (error) {
    return sendError(
      res,
      error.statusCode || 500,
      error.message || "Failed to search invoices",
    );
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  cancelInvoice,
  duplicateInvoice,
  searchInvoices,
};
