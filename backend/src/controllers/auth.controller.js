const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const userModel = require("../models/user.model");

const createToken = (user) => {
  return jwt.sign(
    { id: user.id || user._id, email: user.email },
    config.JWT_SECRET,
    {
      expiresIn: "12h",
    },
  );
};

const sendTokenResponse = (res, user) => {
  const token = createToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user: {
      id: user.id || user._id,
      name: user.fullName || user.name || "Store Owner",
      email: user.email,
      role: user.role || "ADMIN",
    },
  });
};

const signup = async (req, res) => {
  const { fullName, name, email, password } = req.body || {};
  const displayName = fullName || name;

  if (!email || !password || !displayName) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields (name, email, password)",
    });
  }

  const existingUser = await userModel.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    fullName: displayName,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  await newUser.save();

  return sendTokenResponse(res, newUser);
};

const login = async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide email and password" });
  }

  const user = await userModel.findOne({ email: email.toLowerCase() });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  return sendTokenResponse(res, user);
};

const getUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: user.id || user._id,
      name: user.fullName || user.name || "Store Owner",
      email: user.email,
      role: user.role || "ADMIN",
    },
  });
};

const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

const update = async (req, res) => {
  const user = req.user;
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  try {
    await userModel.updateOne(
      { _id: user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: user.id || user._id,
        name: user.fullName || user.name || "Store Owner",
        email: user.email,
        role: user.role || "ADMIN",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
  getUser,
  update,
  logout,
};
