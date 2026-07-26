const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    normalizedName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    sku: {
      type: String,
      trim: true,
      default: "",
    },
    barcode: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    organizationId: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    purchasePrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["PIECE", "KG", "GRAM", "LITER", "ML", "PACK", "BOX", "DOZEN"],
      default: "PIECE",
    },
    gstRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    lowStockAlert: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ organizationId: 1, sku: 1 }, { unique: true, sparse: true });
productSchema.index({ barcode: 1 });
productSchema.index({ normalizedName: 1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
