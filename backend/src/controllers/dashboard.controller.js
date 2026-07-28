const Invoice = require("../models/invoice.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");

const getSummary = async (req, res) => {
  try {
    const user = req.user;
    const organizationId = user.organizationId ? user.organizationId.toString() : user._id.toString();

    // Date range for today (midnight start)
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Date range for last month for percentage change calculations
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

    // 1. Invoices & Revenue Calculations
    const invoices = await Invoice.find({ organizationId }).sort({ createdAt: -1 });

    const totalInvoices = invoices.length;

    let totalRevenue = 0;
    let todaySales = 0;
    let pendingDues = 0;

    invoices.forEach((inv) => {
      const invTotal = inv.totalAmount || inv.subtotal || 0;
      const invPaid = inv.paidAmount || 0;
      const invDue = inv.dueAmount || Math.max(invTotal - invPaid, 0);

      totalRevenue += invTotal;
      pendingDues += invDue;

      if (new Date(inv.createdAt) >= todayStart) {
        todaySales += invTotal;
      }
    });

    // 2. Customers Count
    const totalCustomers = await Customer.countDocuments({ organizationId });

    // 3. Low Stock Products Count
    const products = await Product.find({ organizationId, isActive: true });
    let lowStockProducts = 0;

    products.forEach((prod) => {
      const alertLimit = prod.lowStockAlert || 5;
      if (prod.stock <= alertLimit) {
        lowStockProducts++;
      }
    });

    // 4. Recent Invoices (last 5)
    const recentInvoices = invoices.slice(0, 5).map((inv) => ({
      id: inv._id.toString(),
      invoiceNumber: inv.invoiceNumber,
      customerId: inv.customerId ? inv.customerId.toString() : null,
      customerName: inv.customerName || "Walk-in Customer",
      grandTotal: inv.totalAmount || inv.subtotal || 0,
      totalAmount: inv.totalAmount || inv.subtotal || 0,
      paidAmount: inv.paidAmount || 0,
      dueAmount: inv.dueAmount || 0,
      status: inv.paymentStatus === "PAID" ? "PAID" : inv.status === "CANCELLED" ? "CANCELLED" : "PENDING",
      paymentMethod: inv.paymentMethod || "CASH",
      createdAt: inv.createdAt,
    }));

    // 5. Top Products (sample top 5 products by stock/sales)
    const topProducts = products.slice(0, 5).map((prod) => ({
      id: prod._id.toString(),
      name: prod.name,
      sku: prod.sku,
      sellingPrice: prod.sellingPrice,
      stock: prod.stock,
    }));

    // 6. Sales Chart (Last 7 Days)
    const salesChart = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const dayInvoices = invoices.filter(
        (inv) => new Date(inv.createdAt) >= dayStart && new Date(inv.createdAt) <= dayEnd
      );

      const daySalesTotal = dayInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);

      salesChart.push({
        date: dateStr,
        sales: daySalesTotal,
        invoicesCount: dayInvoices.length,
      });
    }

    // Consolidated payload satisfying both format requirements
    const statsPayload = {
      todaySales,
      totalRevenue,
      totalInvoices,
      totalCustomers,
      pendingDues,
      lowStockProducts,
      lowStockItemsCount: lowStockProducts,
      revenueChange: 0,
      invoicesChange: 0,
      customersChange: 0,
      duesChange: 0,
    };

    return res.status(200).json({
      success: true,
      data: {
        todaySales,
        totalRevenue,
        totalInvoices,
        totalCustomers,
        lowStockProducts,
        recentInvoices,
        topProducts,
        salesChart,
        stats: statsPayload,
      },
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load dashboard metrics",
      error: error.message,
    });
  }
};

const getActivity = async (req, res) => {
  try {
    const user = req.user;
    const organizationId = user.organizationId ? user.organizationId.toString() : user._id.toString();

    const recentInvoices = await Invoice.find({ organizationId }).sort({ createdAt: -1 }).limit(5);

    const activities = recentInvoices.map((inv) => ({
      id: inv._id.toString(),
      type: "INVOICE_CREATED",
      title: `Invoice #${inv.invoiceNumber} Created`,
      description: `₹${inv.totalAmount || inv.subtotal || 0} via ${inv.paymentMethod || "CASH"} for ${inv.customerName || "Customer"}`,
      timestamp: inv.createdAt,
    }));

    return res.status(200).json({
      success: true,
      data: activities,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load activity feed",
    });
  }
};

module.exports = {
  getSummary,
  getActivity,
};
