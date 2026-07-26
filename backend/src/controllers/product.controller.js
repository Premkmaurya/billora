const productService = require("../services/product.service");

const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const sendError = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({ success: false, message, errors });
};

const getProducts = async (req, res) => {
  try {
    const result = await productService.getProducts({
      organizationId: req.user?.organizationId || req.query.organizationId,
      search: req.query.search || req.query.q,
      categoryId: req.query.categoryId,
      isActive: req.query.isActive === undefined ? true : req.query.isActive === "true",
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
      sortBy: req.query.sortBy || "createdAt",
      sortOrder: req.query.sortOrder || "desc",
    });

    return sendSuccess(res, 200, "Products fetched successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to fetch products");
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Product fetched successfully", product);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to fetch product");
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct({
      input: req.body,
      organizationId: req.user?.organizationId || req.body.organizationId,
    });

    return sendSuccess(res, 201, "Product created successfully", product);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to create product");
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.body.organizationId,
      input: req.body,
    });

    return sendSuccess(res, 200, "Product updated successfully", product);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to update product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct({
      id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Product deleted successfully", product);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to delete product");
  }
};

const searchProducts = async (req, res) => {
  try {
    const result = await productService.searchProducts({
      organizationId: req.user?.organizationId || req.query.organizationId,
      q: req.query.q || req.query.search,
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 20,
    });

    return sendSuccess(res, 200, "Products searched successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to search products");
  }
};

const importProducts = async (req, res) => {
  try {
    const products = await productService.importProducts({
      organizationId: req.user?.organizationId || req.body.organizationId,
      products: req.body.products || [],
    });

    return sendSuccess(res, 201, "Products imported successfully", products);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to import products");
  }
};

const exportProducts = async (req, res) => {
  try {
    const products = await productService.exportProducts({
      organizationId: req.user?.organizationId || req.query.organizationId,
    });

    return sendSuccess(res, 200, "Products exported successfully", products);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message || "Failed to export products");
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  importProducts,
  exportProducts,
};
