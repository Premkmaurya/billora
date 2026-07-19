const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    gstNumber: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    logo: {
      type: String,
      default: "",
    },
    currency: {
      type: String,
      trim: true,
      default: "INR",
    },
    timezone: {
      type: String,
      trim: true,
      default: "Asia/Kolkata",
    },
    financialYear: {
      type: String,
      trim: true,
      default: "",
    },
    upiId: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
