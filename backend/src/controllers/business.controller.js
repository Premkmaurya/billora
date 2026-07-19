const Business = require("../models/business.model");

const getBusiness = async (req, res) => {
  try {
    const business = await Business.findOne();

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "No business profile found",
      });
    }

    return res.status(200).json({
      success: true,
      business,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch business profile",
      error: error.message,
    });
  }
};

const createBusiness = async (req, res) => {
  try {
    const existingBusiness = await Business.findOne();
    if (existingBusiness) {
      return res.status(400).json({
        success: false,
        message: "Business profile already exists",
      });
    }

    const business = await Business.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Business profile created successfully",
      business,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create business profile",
      error: error.message,
    });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, runValidators: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Business profile updated successfully",
      business,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update business profile",
      error: error.message,
    });
  }
};

const deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({});

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "No business profile found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Business profile deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete business profile",
      error: error.message,
    });
  }
};

module.exports = {
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
