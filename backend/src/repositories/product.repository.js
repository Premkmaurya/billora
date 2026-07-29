const Product = require("../models/product.model");
const Category = require("../models/category.model");

const normalizeProductOutput = (product) => {
  if (!product) return product;

  const doc = typeof product.toObject === "function" ? product.toObject() : product;

  if (doc._id && !doc.id) {
    doc.id = String(doc._id);
  }

  if (doc.categoryId && typeof doc.categoryId === "object" && doc.categoryId.name) {
    doc.categoryName = doc.categoryId.name;
    doc.categoryId = String(doc.categoryId._id || doc.categoryId);
  } else if (!doc.categoryName) {
    doc.categoryName = undefined;
  }

  return doc;
};

const buildProductQuery = async ({
  organizationId,
  q,
  search,
  category,
  categoryId,
  status,
  isActive,
  stock,
  gstRate,
}) => {
  const query = { organizationId: String(organizationId) };

  const searchQuery = (q || search || "").trim();
  if (searchQuery) {
    const matchingCategories = await Category.find({
      organizationId,
      name: { $regex: searchQuery, $options: "i" },
    })
      .select("_id")
      .lean();

    const categoryIds = matchingCategories.map((item) => item._id);

    query.$or = [
      { name: { $regex: searchQuery, $options: "i" } },
      { normalizedName: { $regex: searchQuery, $options: "i" } },
      { barcode: { $regex: searchQuery, $options: "i" } },
      { sku: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } },
    ];

    if (categoryIds.length) {
      query.$or.push({ categoryId: { $in: categoryIds } });
    }
  }

  const selectedCategory = categoryId || category;
  if (selectedCategory) {
    query.categoryId = selectedCategory;
  }

  const activeVal = status !== undefined ? status : isActive;
  if (activeVal !== undefined && activeVal !== null && activeVal !== "") {
    if (typeof activeVal === "boolean") {
      query.isActive = activeVal;
    } else if (typeof activeVal === "string") {
      const lower = activeVal.toLowerCase();
      if (lower === "active" || lower === "true") {
        query.isActive = true;
      } else if (lower === "inactive" || lower === "false") {
        query.isActive = false;
      }
    }
  }

  if (stock !== undefined && stock !== null && stock !== "") {
    if (stock === "low") {
      query.isActive = true;
      query.$or = [
        { $expr: { $lte: ["$stock", "$lowStockAlert"] } },
        { lowStockAlert: { $exists: false }, stock: { $lte: 5 } },
        { lowStockAlert: null, stock: { $lte: 5 } },
      ];
    } else if (stock === "out_of_stock" || stock === "out") {
      query.stock = { $lte: 0 };
    } else if (stock === "in_stock" || stock === "in") {
      query.stock = { $gt: 0 };
    } else if (!isNaN(Number(stock))) {
      query.stock = Number(stock);
    }
  }

  if (gstRate !== undefined && gstRate !== null && gstRate !== "" && !isNaN(Number(gstRate))) {
    query.gstRate = Number(gstRate);
  }

  return query;
};

const findProducts = async ({
  organizationId,
  q,
  search,
  category,
  categoryId,
  status,
  isActive,
  stock,
  gstRate,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.max(1, parseInt(limit) || 10);
  const skipNum = (pageNum - 1) * limitNum;

  const validSortBy = ["name", "createdAt", "sellingPrice", "purchasePrice", "stock", "gstRate", "sku"].includes(sortBy)
    ? sortBy
    : "createdAt";
  const sort = { [validSortBy]: sortOrder === "asc" ? 1 : -1 };

  const query = await buildProductQuery({
    organizationId,
    q,
    search,
    category,
    categoryId,
    status,
    isActive,
    stock,
    gstRate,
  });

  const [productsRaw, total, activeProducts, inactiveProducts, lowStockProducts] = await Promise.all([
    Product.find(query)
      .sort(sort)
      .skip(skipNum)
      .limit(limitNum)
      .populate("categoryId", "name")
      .lean(),
    Product.countDocuments(query),
    Product.countDocuments({ organizationId, isActive: true }),
    Product.countDocuments({ organizationId, isActive: false }),
    Product.countDocuments({
      organizationId,
      isActive: true,
      $or: [
        { $expr: { $lte: ["$stock", "$lowStockAlert"] } },
        { lowStockAlert: { $exists: false }, stock: { $lte: 5 } },
        { lowStockAlert: null, stock: { $lte: 5 } },
      ],
    }),
  ]);

  const products = productsRaw.map(normalizeProductOutput);
  const totalPages = Math.ceil(total / limitNum) || (total === 0 ? 0 : 1);

  return {
    products,
    meta: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1 && pageNum <= totalPages,
    },
    stats: {
      totalProducts: activeProducts + inactiveProducts,
      activeProducts,
      inactiveProducts,
      lowStockProducts,
    },
  };
};

const findProductById = async ({ id, organizationId }) => {
  const product = await Product.findOne({ _id: id, organizationId }).populate("categoryId", "name").lean();
  return normalizeProductOutput(product);
};

const createProduct = async (payload) => {
  const product = await Product.create(payload);
  const populated = await Product.findById(product._id).populate("categoryId", "name").lean();
  return normalizeProductOutput(populated);
};

const updateProduct = async ({ id, organizationId, payload }) => {
  const product = await Product.findOneAndUpdate(
    { _id: id, organizationId },
    { $set: payload },
    { new: true, runValidators: true }
  )
    .populate("categoryId", "name")
    .lean();
  return normalizeProductOutput(product);
};

const softDeleteProduct = async ({ id, organizationId }) => {
  return Product.findOneAndDelete({ _id: id, organizationId });
};

const searchProducts = async (params) => {
  return findProducts(params);
};

module.exports = {
  findProducts,
  findProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
  searchProducts,
  normalizeProductOutput,
};
