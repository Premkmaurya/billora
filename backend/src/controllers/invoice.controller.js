const invoiceRepository = require("../repositories/invoice.repository");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

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
    const { items, customerId, customerName, customerPhone, discount, paidAmount, paymentMethod, notes, status } = req.body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invoice must contain at least one product item",
        errors: [{ field: "items", message: "Items array cannot be empty" }],
      });
    }

    const productIds = items.map((i) => i.productId).filter(Boolean);
    const products = await Product.find({
      _id: { $in: productIds },
      organizationId,
    }).lean();

    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    const preparedItems = [];
    let calculatedSubtotal = 0;
    let calculatedTaxTotal = 0;

    for (const item of items) {
      if (!item.productId) continue;
      const product = productMap.get(String(item.productId));
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Selected product was not found or belongs to another store",
          errors: [{ field: "productId", message: "Product not found" }],
        });
      }

      const qty = Math.max(1, parseInt(item.quantity) || 1);

      if (product.stock < qty) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product "${product.name}". Available stock: ${product.stock}, requested: ${qty}`,
          errors: [{ field: "stock", message: `Insufficient stock for ${product.name}` }],
        });
      }

      const unitPrice = Number(product.sellingPrice ?? 0);
      const gstRate = Number(product.gstRate ?? 0);
      const lineSubtotal = qty * unitPrice;
      const lineTax = (lineSubtotal * gstRate) / 100;
      const lineTotal = lineSubtotal + lineTax;

      calculatedSubtotal += lineSubtotal;
      calculatedTaxTotal += lineTax;

      preparedItems.push({
        productId: product._id,
        quantity: qty,
        unitPrice,
        discount: Math.max(0, Number(item.discount ?? 0)),
        gstRate,
        taxAmount: lineTax,
        total: lineTotal,
      });
    }

    if (preparedItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one valid product",
      });
    }

    const discountAmount = Math.max(0, Number(discount ?? 0));
    const totalAmount = Math.max(0, calculatedSubtotal + calculatedTaxTotal - discountAmount);
    const amountReceived = Number(paidAmount !== undefined ? paidAmount : totalAmount);
    const dueAmount = Math.max(0, totalAmount - amountReceived);

    let paymentStatus = "UNPAID";
    if (amountReceived >= totalAmount && totalAmount > 0) {
      paymentStatus = "PAID";
    } else if (amountReceived > 0) {
      paymentStatus = "PARTIAL";
    }

    const invoiceNumber = await invoiceRepository.createInvoiceNumber(organizationId);

    const invoicePayload = {
      invoiceNumber,
      customerId: customerId ? customerId : null,
      organizationId,
      subtotal: calculatedSubtotal,
      discountAmount,
      taxAmount: calculatedTaxTotal,
      totalAmount,
      paidAmount: amountReceived,
      dueAmount,
      paymentMethod: paymentMethod || "CASH",
      paymentStatus,
      status: status || "COMPLETED",
      notes: notes || "",
    };

    const createdInvoice = await invoiceRepository.createInvoice(
      invoicePayload,
      preparedItems
    );

    // Update stock for each product
    await Promise.all(
      preparedItems.map((item) =>
        Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity },
        })
      )
    );

    // Update customer last purchase
    if (customerId) {
      await Customer.findByIdAndUpdate(customerId, {
        $set: { lastPurchaseAt: new Date() },
      });
    }

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: createdInvoice,
      invoice: createdInvoice,
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
