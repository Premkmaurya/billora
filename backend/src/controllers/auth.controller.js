const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "billing-app-secret";
const userModel = require("../models/user.model");

const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendTokenResponse = (res, user) => {
  const token = createToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

const getTokenFromRequest = (req) => {
  if (req.cookies && req.cookies.jwt) {
    return req.cookies.jwt;
  }

  const cookieHeader = req.headers.cookie || "";
  const cookieValue = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("jwt="));

  if (cookieValue) {
    return decodeURIComponent(cookieValue.split("=")[1]);
  }

  const authHeader = req.headers.authorization || "";
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
};

const getAuthenticatedUser = (req) => {
  const token = getTokenFromRequest(req);
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return userModel.findById(decoded.id);
  } catch (error) {
    return null;
  }
};

const signup = async (req, res) => {
  const { fullName, email, password } = req.body || {};

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    fullName,
    email,
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
      .json({ success: false, message: "Email and password are required" });
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
  const user = getAuthenticatedUser(req);

  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
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

module.exports = {
  signup,
  login,
  getUser,
  logout,
};
