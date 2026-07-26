const productRepository = require("../repositories/product.repository");
const Product = require("../models/product.model");

const normalizeProductName = (name) =>
  String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const buildProductPayload = (input, organizationId) => {
  const normalizedName = normalizeProductName(input.name);

  return {
    ...input,
    organizationId,
    normalizedName,
    sellingPrice: Number(input.sellingPrice),
    purchasePrice: input.purchasePrice === undefined ? 0 : Number(input.purchasePrice),
    stock: input.stock === undefined ? 0 : Number(input.stock),
    gstRate: input.gstRate === undefined ? 0 : Number(input.gstRate),
    lowStockAlert: input.lowStockAlert === undefined ? 0 : Number(input.lowStockAlert),
    isActive: input.isActive !== false,
  };
};

const getProducts = async (params) => {
  return productRepository.findProducts(params);
};

const getProductById = async ({ id, organizationId }) => {
  const product = await productRepository.findProductById({ id, organizationId });
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }
  return product;
};

const createProduct = async ({ input, organizationId }) => {
  const payload = buildProductPayload(input, organizationId);
  const existing = await Product.findOne({ organizationId, sku: payload.sku }).lean();

  if (payload.sku && existing) {
    const error = new Error("Product SKU must be unique within the organization");
    error.statusCode = 409;
    throw error;
  }

  return productRepository.createProduct(payload);
};

const updateProduct = async ({ id, organizationId, input }) => {
  const existing = await productRepository.findProductById({ id, organizationId });
  if (!existing) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const payload = buildProductPayload({ ...existing.toObject(), ...input }, organizationId);

  if (payload.sku && payload.sku !== existing.sku) {
    const duplicate = await Product.findOne({ organizationId, sku: payload.sku, _id: { $ne: id } }).lean();
    if (duplicate) {
      const error = new Error("Product SKU must be unique within the organization");
      error.statusCode = 409;
      throw error;
    }
  }

  return productRepository.updateProduct({ id, organizationId, payload });
};

const deleteProduct = async ({ id, organizationId }) => {
  const existing = await productRepository.findProductById({ id, organizationId });
  if (!existing) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  return productRepository.softDeleteProduct({ id, organizationId });
};

const searchProducts = async ({ organizationId, q, page, limit }) => {
  return productRepository.searchProducts({ organizationId, q, page, limit });
};

const importProducts = async ({ organizationId, products }) => {
  const created = [];
  for (const item of products) {
    const payload = buildProductPayload(item, organizationId);
    const product = await productRepository.createProduct(payload);
    created.push(product);
  }
  return created;
};

const exportProducts = async ({ organizationId }) => {
  return Product.find({ organizationId, isActive: true }).lean();
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
