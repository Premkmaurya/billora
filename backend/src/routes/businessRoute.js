const express = require("express");
const router = express.Router();
const businessController = require("../controllers/business.controller");
const { protect, authorizeRoles } = require("../middlewares/auth.middleware");
const { businessValidation } = require("../middlewares/validation.middleware");

router.get("/", protect, businessController.getBusiness);
router.post("/", protect, authorizeRoles("owner", "manager"), businessValidation, businessController.createBusiness);
router.patch("/", protect, authorizeRoles("owner", "manager"), businessValidation, businessController.updateBusiness);
router.delete("/", protect, authorizeRoles("owner", "manager"), businessController.deleteBusiness);

module.exports = router;
