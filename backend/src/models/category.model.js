const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    normalizedName: {
      type: String,
      required: [true, "Normalized category name is required"],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    organizationId: {
      type: String,
      required: [true, "Organization ID is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-validate hook to automatically compute normalizedName from name
categorySchema.pre("validate", function () {
  if (this.name) {
    this.normalizedName = this.name.trim().toLowerCase();
  }
});

// Single-field indexes
categorySchema.index({ organizationId: 1 });
categorySchema.index({ normalizedName: 1 });

// Compound unique index per organization
categorySchema.index({ organizationId: 1, normalizedName: 1 }, { unique: true });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
