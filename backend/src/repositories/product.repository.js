const Product = require("../models/product.model");
const Category = require("../models/category.model");

const buildProductQuery = async ({ organizationId, search, categoryId, isActive }) => {
  const query = { organizationId };

  if (typeof isActive === "boolean") {
    query.isActive = isActive;
  }

  if (categoryId) {
    query.categoryId = categoryId;
  }

  if (search) {
    const searchable = search.trim();
    const matchingCategories = await Category.find({
      organizationId,
      $or: [{ name: { $regex: searchable, $options: "i" } }],
    }).select("_id");

    const categoryIds = matchingCategories.map((item) => item._id);

    query.$or = [
      { name: { $regex: searchable, $options: "i" } },
      { normalizedName: { $regex: searchable, $options: "i" } },
      { barcode: { $regex: searchable, $options: "i" } },
      { sku: { $regex: searchable, $options: "i" } },
    ];

    if (categoryIds.length) {
      query.$or.push({ categoryId: { $in: categoryIds } });
    }
  }

  return query;
};

const findProducts = async ({ organizationId, search, categoryId, isActive, page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc" }) => {
  const query = await buildProductQuery({ organizationId, search, categoryId, isActive });
  const skip = (page - 1) * limit;
  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate("categoryId", "name"),
    Product.countDocuments(query),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const findProductById = async ({ id, organizationId }) => {
  return Product.findOne({ _id: id, organizationId }).populate("categoryId", "name");
};

const createProduct = async (payload) => {
  return Product.create(payload);
};

const updateProduct = async ({ id, organizationId, payload }) => {
  return Product.findOneAndUpdate(
    { _id: id, organizationId },
    { $set: payload },
    { new: true, runValidators: true }
  );
};

const softDeleteProduct = async ({ id, organizationId }) => {
  return Product.findOneAndUpdate(
    { _id: id, organizationId },
    { $set: { isActive: false } },
    { new: true }
  );
};

const searchProducts = async ({ organizationId, q, page = 1, limit = 20 }) => {
  const query = buildProductQuery({ organizationId, search: q });
  return findProducts({ organizationId, search: q, page, limit });
};

module.exports = {
  findProducts,
  findProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
  searchProducts,
};
