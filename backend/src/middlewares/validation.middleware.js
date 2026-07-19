const { validationResult } = require("express-validator");
const { body } = require("express-validator");

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

module.exports = {
  signupValidation,
  loginValidation,
  businessValidation,
};
