const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoute");
const businessRoutes = require("./routes/businessRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const customerRoutes = require("./routes/customerRoute");
const invoiceRoutes = require("./routes/invoiceRoute");
const dashboardRoutes = require("./routes/dashboardRoute");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/organization", businessRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
