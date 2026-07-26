const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
const { categoryValidation } = require("../middlewares/validation.middleware");

router.get("/", protect, categoryController.getCategories);
router.get("/:id", protect, categoryController.getCategoryById);
router.post("/", protect, authorizeRoles("owner", "manager"), categoryValidation, categoryController.createCategory);
router.patch("/:id", protect, authorizeRoles("owner", "manager"), categoryValidation, categoryController.updateCategory);
router.delete("/:id", protect, authorizeRoles("owner", "manager"), categoryController.deleteCategory);

module.exports = router;
