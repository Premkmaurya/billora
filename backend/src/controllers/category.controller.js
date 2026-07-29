const Category = require("../models/category.model");

const getOrganizationId = (req) => {
  return String(req.user?.organizationId || req.user?._id || req.user?.id || "");
};

const normalizeCategoryOutput = (category) => {
  if (!category) return category;
  const doc = typeof category.toObject === "function" ? category.toObject() : category;
  if (doc._id && !doc.id) {
    doc.id = String(doc._id);
  }
  return doc;
};

const getCategories = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { q, search, active, isActive, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    const query = { organizationId };

    const searchQuery = (q || search || "").trim();
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
      ];
    }

    const activeVal = active !== undefined ? active : isActive;
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

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 10);
    const skipNum = (pageNum - 1) * limitNum;

    const validSortBy = ["name", "createdAt"].includes(sortBy) ? sortBy : "createdAt";
    const sort = { [validSortBy]: sortOrder === "asc" ? 1 : -1 };

    const [categoriesRaw, total, activeCategories, inactiveCategories] = await Promise.all([
      Category.find(query).sort(sort).skip(skipNum).limit(limitNum).lean(),
      Category.countDocuments(query),
      Category.countDocuments({ organizationId, isActive: true }),
      Category.countDocuments({ organizationId, isActive: false }),
    ]);

    const categories = categoriesRaw.map(normalizeCategoryOutput);
    const totalPages = Math.ceil(total / limitNum) || (total === 0 ? 0 : 1);

    const meta = {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1 && pageNum <= totalPages,
    };

    const stats = {
      totalCategories: activeCategories + inactiveCategories,
      activeCategories,
      inactiveCategories,
    };

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
      meta,
      stats,
      categories,
      items: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      errors: [error.message],
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const rawCategory = await Category.findOne({
      _id: req.params.id,
      organizationId,
    }).lean();

    if (!rawCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = normalizeCategoryOutput(rawCategory);

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      errors: [error.message],
    });
  }
};

const createCategory = async (req, res) => {
  const { name, description, isActive } = req.body;
  const organizationId = getOrganizationId(req);

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
      errors: [{ field: "name", message: "Category name is required" }],
    });
  }

  if (!organizationId) {
    return res.status(400).json({
      success: false,
      message: "Organization ID is required",
      errors: [{ field: "organizationId", message: "Organization ID is required" }],
    });
  }

  const trimmedName = name.trim();
  const normalizedName = trimmedName.toLowerCase();

  try {
    const existingCategory = await Category.findOne({
      organizationId,
      normalizedName,
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: `Category '${trimmedName}' already exists.`,
      });
    }

    const categoryDoc = new Category({
      name: trimmedName,
      normalizedName,
      description: description || "",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      organizationId,
    });

    await categoryDoc.save();
    const category = normalizeCategoryOutput(categoryDoc.toObject());

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Category '${trimmedName}' already exists.`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      errors: [error.message],
    });
  }
};

const updateCategory = async (req, res) => {
  const organizationId = getOrganizationId(req);
  const { id } = req.params;

  try {
    const updateData = { ...req.body };

    if (updateData.name && typeof updateData.name === "string") {
      updateData.name = updateData.name.trim();
      updateData.normalizedName = updateData.name.toLowerCase();

      if (organizationId) {
        const existingCategory = await Category.findOne({
          _id: { $ne: id },
          organizationId,
          normalizedName: updateData.normalizedName,
        });

        if (existingCategory) {
          return res.status(409).json({
            success: false,
            message: `Category '${updateData.name}' already exists.`,
          });
        }
      }
    }

    const rawCategory = await Category.findOneAndUpdate(
      {
        _id: id,
        organizationId,
      },
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!rawCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const category = normalizeCategoryOutput(rawCategory);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Category '${req.body.name || "with this name"}' already exists.`,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      errors: [error.message],
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      organizationId,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      errors: [error.message],
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
