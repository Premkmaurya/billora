const productRepository = require("../repositories/product.repository");

const getOrganizationId = (req) => {
  return String(req.user?.organizationId || req.user?._id || req.user?.id || "");
};

const getProducts = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const result = await productRepository.findProducts({
      organizationId,
      ...req.query,
    });

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: result.products,
      meta: result.meta,
      stats: result.stats,
      products: result.products,
      items: result.products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      errors: [error.message],
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const result = await productRepository.searchProducts({
      organizationId,
      ...req.query,
    });

    return res.status(200).json({
      success: true,
      message: "Products searched successfully",
      data: result.products,
      meta: result.meta,
      stats: result.stats,
      products: result.products,
      items: result.products,
    });
  } catch (error) {
    console.error("Error searching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search products",
      errors: [error.message],
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const product = await productRepository.findProductById({ id, organizationId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
      product,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      errors: [error.message],
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const product = await productRepository.createProduct({
      ...req.body,
      organizationId,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      errors: [error.message],
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const product = await productRepository.updateProduct({
      id,
      organizationId,
      payload: req.body,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      errors: [error.message],
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { id } = req.params;
    const deleted = await productRepository.softDeleteProduct({ id, organizationId });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      errors: [error.message],
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  searchProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
