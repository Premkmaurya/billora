const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
const { customerValidation } = require("../middlewares/validation.middleware");

router.get("/search", protect, customerController.searchCustomers);
router.get("/", protect, customerController.getCustomers);
router.get("/:id", protect, customerController.getCustomerById);
router.post("/", protect, authorizeRoles("owner", "manager"), customerValidation, customerController.createCustomer);
router.patch("/:id", protect, authorizeRoles("owner", "manager"), customerValidation, customerController.updateCustomer);
router.delete("/:id", protect, authorizeRoles("owner", "manager"), customerController.deleteCustomer);

module.exports = router;
