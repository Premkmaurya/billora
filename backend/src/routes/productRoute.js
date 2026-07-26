const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
const { productValidation } = require("../middlewares/validation.middleware");

router.get("/search", protect, productController.searchProducts);
router.get("/export", protect, productController.exportProducts);
router.get("/", protect, productController.getProducts);
router.get("/:id", protect, productController.getProductById);
router.post("/", protect, authorizeRoles("owner", "manager"), productValidation, productController.createProduct);
router.post("/import", protect, authorizeRoles("owner", "manager"), productController.importProducts);
router.patch("/:id", protect, authorizeRoles("owner", "manager"), productValidation, productController.updateProduct);
router.delete("/:id", protect, authorizeRoles("owner", "manager"), productController.deleteProduct);

module.exports = router;
