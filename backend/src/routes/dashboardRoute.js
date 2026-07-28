const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/summary", protect, dashboardController.getSummary);

router.get("/stats", protect, dashboardController.getSummary);

router.get("/activity", protect, dashboardController.getActivity);

module.exports = router;
