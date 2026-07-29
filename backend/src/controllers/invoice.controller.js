const invoiceRepository = require("../repositories/invoice.repository");

const getOrganizationId = (req) => {
  return String(req.user?.organizationId || req.user?._id || req.user?.id || "");
};

const getInvoices = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const result = await invoiceRepository.findInvoices({
      organizationId,
      ...req.query,
    });

    return res.status(200).json({
      success: true,
      message: "Invoices fetched successfully",
      data: result.invoices,
      meta: result.meta,
      stats: result.stats,
      invoices: result.invoices,
      items: result.invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch invoices",
      errors: [error.message],
    });
  }
};

const searchInvoices = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const result = await invoiceRepository.searchInvoices({
      organizationId,
      ...req.query,
    });

    return res.status(200).json({
      success: true,
      message: "Invoices searched successfully",
      data: result.invoices,
      meta: result.meta,
      stats: result.stats,
      invoices: result.invoices,
      items: result.invoices,
    });
  } catch (error) {
    console.error("Error searching invoices:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search invoices",
      errors: [error.message],
    });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const invoice = await invoiceRepository.findInvoiceById({ id, organizationId });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice fetched successfully",
      data: invoice,
      invoice,
    });
  } catch (error) {
    console.error("Error fetching invoice by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch invoice",
      errors: [error.message],
    });
  }
};

const createInvoice = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { items, ...invoicePayload } = req.body || {};

    if (!invoicePayload.invoiceNumber) {
      invoicePayload.invoiceNumber = await invoiceRepository.createInvoiceNumber(organizationId);
    }

    const invoice = await invoiceRepository.createInvoice(
      {
        ...invoicePayload,
        organizationId,
      },
      items
    );

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
      invoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create invoice",
      errors: [error.message],
    });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const invoice = await invoiceRepository.updateInvoice({
      id,
      organizationId,
      payload: req.body,
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice updated successfully",
      data: invoice,
      invoice,
    });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update invoice",
      errors: [error.message],
    });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const deleted = await invoiceRepository.deleteInvoice({ id, organizationId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete invoice",
      errors: [error.message],
    });
  }
};

const cancelInvoice = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const invoice = await invoiceRepository.markCancelled({ id, organizationId });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice cancelled successfully",
      data: invoice,
      invoice,
    });
  } catch (error) {
    console.error("Error cancelling invoice:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to cancel invoice",
      errors: [error.message],
    });
  }
};

const duplicateInvoice = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const existing = await invoiceRepository.findInvoiceById({ id, organizationId });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const newInvoiceNumber = await invoiceRepository.createInvoiceNumber(organizationId);

    const { _id, id: oldId, invoiceNumber, createdAt, updatedAt, ...copyData } = existing;
    const duplicated = await invoiceRepository.createInvoice(
      {
        ...copyData,
        invoiceNumber: newInvoiceNumber,
        organizationId,
        status: "DRAFT",
      },
      existing.items || []
    );

    return res.status(201).json({
      success: true,
      message: "Invoice duplicated successfully",
      data: duplicated,
      invoice: duplicated,
    });
  } catch (error) {
    console.error("Error duplicating invoice:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to duplicate invoice",
      errors: [error.message],
    });
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
