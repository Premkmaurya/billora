const { validationResult } = require("express-validator");
const { body } = require("express-validator");
const { z } = require("zod");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  return next();
};

const signupValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];

const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
  handleValidationErrors,
];

const businessValidation = [
  body("businessName")
    .trim()
    .notEmpty()
    .withMessage("Business name is required"),
  body("email")
    .optional({ values: "falsy" })
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("phone")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Phone must be a string"),
  body("currency")
    .optional({ values: "falsy" })
    .trim()
    .notEmpty()
    .withMessage("Currency is required"),
  body("timezone")
    .optional({ values: "falsy" })
    .trim()
    .notEmpty()
    .withMessage("Timezone is required"),
  handleValidationErrors,
];

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),
  body("description")
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage("Description must be a string"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("organizationId")
    .optional({ values: "falsy" })
    .trim(),
  handleValidationErrors,
];

const productSchema = z.object({
  name: z.string().trim().min(1, "Product name is required").optional(),
  normalizedName: z.string().trim().optional(),
  sku: z.string().trim().optional().or(z.literal("")),
  barcode: z.string().trim().optional().or(z.literal("")),
  hsnCode: z.string().trim().optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  image: z.string().trim().optional().or(z.literal("")),
  categoryId: z.string().trim().optional().or(z.literal("")),
  organizationId: z.string().trim().optional().or(z.literal("")),
  price: z.coerce.number().nonnegative().optional(),
  sellingPrice: z.coerce.number().nonnegative().optional(),
  costPrice: z.coerce.number().nonnegative().optional(),
  purchasePrice: z.coerce.number().nonnegative().optional(),
  stock: z.coerce.number().nonnegative().optional(),
  unit: z.string().optional(),
  taxRate: z.coerce.number().nonnegative().optional(),
  gstRate: z.coerce.number().nonnegative().optional(),
  minStockAlert: z.coerce.number().nonnegative().optional(),
  lowStockAlert: z.coerce.number().nonnegative().optional(),
  isActive: z.boolean().optional(),
});

const productValidation = (req, res, next) => {
  try {
    productSchema.parse(req.body);
    return next();
  } catch (error) {
    const issues = error.issues?.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })) || [];

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: issues,
    });
  }
};

const customerSchema = z.object({
  name: z.string().trim().min(1, "Customer name is required"),
  normalizedName: z.string().trim().optional(),
  phone: z.string().trim().min(1, "Phone number is required"),
  email: z.string().trim().email("Please provide a valid email address").optional().or(z.literal("")),
  gstNumber: z.string().trim().optional().or(z.literal("")),
  gstin: z.string().trim().optional().or(z.literal("")),
  address: z.string().trim().optional().or(z.literal("")),
  organizationId: z.string().trim().optional().or(z.literal("")),
  isActive: z.boolean().optional(),
});

const customerValidation = (req, res, next) => {
  try {
    customerSchema.parse(req.body);
    return next();
  } catch (error) {
    const issues = error.issues?.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })) || [];

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: issues,
    });
  }
};

const invoiceSchema = z.object({
  customerId: z.string().trim().optional().or(z.literal("")),
  organizationId: z.string().trim().optional().or(z.literal("")),
  items: z.array(
    z.object({
      productId: z.string().trim().min(1, "Product ID is required"),
      quantity: z.coerce.number().int().positive("Quantity must be greater than 0"),
      discount: z.coerce.number().nonnegative().optional(),
    })
  ).min(1, "At least one invoice item is required"),
  paidAmount: z.coerce.number().nonnegative().optional(),
  paymentMethod: z.enum(["CASH", "UPI", "CARD", "CREDIT"]).optional(),
  paymentStatus: z.enum(["PAID", "PARTIAL", "UNPAID"]).optional(),
  status: z.enum(["DRAFT", "COMPLETED", "CANCELLED"]).optional(),
  notes: z.string().trim().optional().or(z.literal("")),
});

const invoiceValidation = (req, res, next) => {
  try {
    invoiceSchema.parse(req.body);
    return next();
  } catch (error) {
    const issues = error.issues?.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })) || [];

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: issues,
    });
  }
};

module.exports = {
  signupValidation,
  loginValidation,
  businessValidation,
  categoryValidation,
  productValidation,
  customerValidation,
  invoiceValidation,
};
