const Category = require("../models/category.model");

const getCategories = async (req, res) => {
  try {
    const organizationId = req.user?.organizationId || req.query.organizationId;
    const categories = await Category.find({
      organizationId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const organizationId = req.user?.organizationId || req.query.organizationId;
    const category = await Category.findOne({
      _id: req.params.id,
      organizationId,
    });
    if (!category) {
      return res.status(404).json({
        message: "Category not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Category fetched successfully",
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch category",
      success: false,
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  const { name, description, isActive } = req.body;
  const organizationId = req.user?.organizationId || req.body.organizationId;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  if (!organizationId) {
    return res.status(400).json({
      success: false,
      message: "Organization ID is required",
    });
  }

  const trimmedName = name.trim();
  const normalizedName = trimmedName.toLowerCase();

  try {
    // Validate duplicate within the same organization before inserting
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

    const category = new Category({
      name: trimmedName,
      normalizedName,
      description,
      isActive,
      organizationId,
    });

    await category.save();

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
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
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const organizationId = req.user?.organizationId || req.body.organizationId;
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

    const category = await Category.findOneAndUpdate(
      {
        _id: id,
        ...(organizationId ? { organizationId } : {}),
      },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
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
      error: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
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
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
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
