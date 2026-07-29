const Business = require("../models/business.model");
const userModel = require("../models/user.model");

const normalizeBusinessOutput = (business) => {
  if (!business) return business;
  const doc = typeof business.toObject === "function" ? business.toObject() : business;
  if (doc._id && !doc.id) {
    doc.id = String(doc._id);
  }
  if (!doc.name && doc.businessName) {
    doc.name = doc.businessName;
  }
  if (!doc.gstin && doc.gstNumber) {
    doc.gstin = doc.gstNumber;
  }
  return doc;
};

const getBusiness = async (req, res) => {
  try {
    const rawBusiness = await Business.findOne().lean();

    if (!rawBusiness) {
      return res.status(404).json({
        success: false,
        message: "No business profile found",
      });
    }

    const business = normalizeBusinessOutput(rawBusiness);

    return res.status(200).json({
      success: true,
      message: "Business profile fetched successfully",
      data: business,
      business,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch business profile",
      errors: [error.message],
    });
  }
};

const createBusiness = async (req, res) => {
  try {
    const existingBusiness = await Business.findOne().lean();
    if (existingBusiness) {
      return res.status(400).json({
        success: false,
        message: "Business profile already exists",
      });
    }

    const payload = { ...req.body };
    if (!payload.businessName && payload.name) {
      payload.businessName = payload.name;
    }
    if (!payload.gstNumber && payload.gstin) {
      payload.gstNumber = payload.gstin;
    }

    const created = await Business.create(payload);
    const business = normalizeBusinessOutput(created.toObject());

    const userId = req.user?.id || req.user?._id;
    if (userId) {
      await userModel.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            role: "owner",
            organizationId: String(created._id),
          },
        }
      );
    }

    return res.status(201).json({
      success: true,
      message: "Business profile created successfully",
      data: business,
      business,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create business profile",
      errors: [error.message],
    });
  }
};

const updateBusiness = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (!payload.businessName && payload.name) {
      payload.businessName = payload.name;
    }
    if (!payload.gstNumber && payload.gstin) {
      payload.gstNumber = payload.gstin;
    }

    const updated = await Business.findOneAndUpdate(
      {},
      { $set: payload },
      { new: true, runValidators: true, upsert: true }
    ).lean();

    const business = normalizeBusinessOutput(updated);

    return res.status(200).json({
      success: true,
      message: "Business profile updated successfully",
      data: business,
      business,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update business profile",
      errors: [error.message],
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
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete business profile",
      errors: [error.message],
    });
  }
};

module.exports = {
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
};
