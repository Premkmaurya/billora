const Category = require("../models/category.model");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      organizationId: req.user?.organizationId || req.query.organizationId,
    }).sort({ createdAt: -1 });

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
    const category = await Category.findOne({
      _id: req.params.id,
      organizationId: req.user?.organizationId || req.query.organizationId,
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
  try {
    const category = await Category.create({
      ...req.body,
      organizationId: req.user?.organizationId || req.body.organizationId,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        organizationId: req.user?.organizationId || req.body.organizationId,
      },
      { $set: req.body },
      { new: true, runValidators: true },
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
