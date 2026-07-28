const productModel = require("../models/product.model");

const sendErrorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
};

const sendSuccessResponse = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};

const getProducts = async (req, res) => {
  try {
    const { organizationId } = req.user;
    const { search, categoryId, isActive, page, limit, sortBy, sortOrder } =
      req.query;
    const products = await productModel.find({
      organizationId,
    });
    sendSuccessResponse(res, 200, products);
  } catch (error) {
    console.error("Error fetching products:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const createProduct = async (req, res) => {
  try {
    const { organizationId } = req.user;
    const product = await productModel.create({
      ...req.body,
      organizationId,
    });
    sendSuccessResponse(res, 201, product);
  } catch (error) {
    console.error("Error creating product:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const getProductById = async (req, res) => {
  try {
    const { organizationId } = req.user;
    const { id } = req.params;
    const product = await productModel.findById({ id, organizationId });
    if (!product) {
      return sendErrorResponse(res, 404, "Product not found");
    }
    sendSuccessResponse(res, 200, product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const searchProducts = async (req, res) => {
  try {
    const { organizationId } = req.user;
    const { q, page, limit } = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skipNum = (pageNum - 1) * limitNum;

    const query = { organizationId };

    // 3. Add partial text search if 'q' is provided
    if (q) {
      // Searches for 'q' inside the 'name' field (case-insensitive)
      query.name = { $regex: q, $options: "i" };
    }

    const products = await productModel
      .find(query)
      .skip(skipNum)
      .limit(limitNum);

    sendSuccessResponse(res, 200, products);
  } catch (error) {
    console.error("Error searching products:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const { organizationId } = req.user;
    const { id } = req.params;
    const updatedProduct = await productModel.findByIdAndUpdate({
      _id: id,
      organizationId,
      payload: req.body,
    });
    if (!updatedProduct) {
      return sendErrorResponse(res, 404, "Product not found");
    }
    sendSuccessResponse(res, 200, updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { organizationId } = req.user;
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete({
      _id: id,
      organizationId,
    });
    if (!deletedProduct) {
      return sendErrorResponse(res, 404, "Product not found");
    }
    sendSuccessResponse(res, 200, { message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    sendErrorResponse(res, 500, "Internal Server Error");
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
