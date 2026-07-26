const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
const { invoiceValidation } = require("../middlewares/validation.middleware");

router.get("/search", protect, invoiceController.searchInvoices);
router.get("/", protect, invoiceController.getInvoices);
router.get("/:id", protect, invoiceController.getInvoiceById);
router.post("/", protect, authorizeRoles("owner", "manager"), invoiceValidation, invoiceController.createInvoice);
router.patch("/:id", protect, authorizeRoles("owner", "manager"), invoiceValidation, invoiceController.updateInvoice);
router.delete("/:id", protect, authorizeRoles("owner", "manager"), invoiceController.deleteInvoice);
router.post("/:id/cancel", protect, authorizeRoles("owner", "manager"), invoiceController.cancelInvoice);
router.post("/:id/duplicate", protect, authorizeRoles("owner", "manager"), invoiceController.duplicateInvoice);

module.exports = router;
