const Invoice = require("../models/invoice.model");
const InvoiceItem = require("../models/invoiceItem.model");
const Product = require("../models/product.model");
const Customer = require("../models/customer.model");
const Category = require("../models/category.model");
const { calculateDashboardDateRange } = require("../utils/dashboardDateRange");

const getOrganizationId = (req) => {
  return String(req.user?.organizationId || req.user?._id || req.user?.id || "");
};

const getSummary = async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const { startDate, endDate, range } = calculateDashboardDateRange(req.query || {});

    const dateFilterQuery = {
      organizationId,
      createdAt: { $gte: startDate, $lte: endDate },
    };

    const [
      rangeInvoices,
      totalCustomersCount,
      activeCustomersCount,
      totalProductsCount,
      totalCategoriesCount,
      lowStockProductsRaw,
      recentCustomers,
      recentProducts,
      recentCategories,
      topSellingAgg,
    ] = await Promise.all([
      // 1. Invoices created in date range
      Invoice.find(dateFilterQuery).populate("customerId", "name phone").sort({ createdAt: -1 }).lean(),

      // 2. Customer counts (Current system state per requirement)
      Customer.countDocuments({ organizationId }),
      Customer.countDocuments({ organizationId, isActive: true }),

      // 3. Product & Category counts (Current system state per requirement)
      Product.countDocuments({ organizationId }),
      Category.countDocuments({ organizationId }),

      // 4. Low stock products (Current system state per requirement)
      Product.find({ organizationId, isActive: true })
        .populate("categoryId", "name")
        .lean(),

      // 5. Recent entities for activity feed in date range
      Customer.find({ organizationId, createdAt: { $gte: startDate, $lte: endDate } }).sort({ createdAt: -1 }).limit(10).lean(),
      Product.find({ organizationId, createdAt: { $gte: startDate, $lte: endDate } }).sort({ createdAt: -1 }).limit(10).lean(),
      Category.find({ organizationId, createdAt: { $gte: startDate, $lte: endDate } }).sort({ createdAt: -1 }).limit(10).lean(),

      // 6. Top selling products via InvoiceItem aggregation for invoices in date range
      InvoiceItem.aggregate([
        {
          $lookup: {
            from: "invoices",
            localField: "invoiceId",
            foreignField: "_id",
            as: "invoice",
          },
        },
        { $unwind: "$invoice" },
        {
          $match: {
            "invoice.organizationId": organizationId,
            "invoice.status": { $ne: "CANCELLED" },
            "invoice.createdAt": { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: "$productId",
            quantitySold: { $sum: "$quantity" },
            revenue: { $sum: "$total" },
          },
        },
        { $sort: { quantitySold: -1 } },
        { $limit: 5 },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        { $unwind: { path: "$productDetails", preserveNullAndEmptyArrays: true } },
      ]),
    ]);

    let totalRevenue = 0;
    let pendingDueAmount = 0;
    const validInvoices = rangeInvoices.filter((inv) => inv.status !== "CANCELLED");

    validInvoices.forEach((inv) => {
      const invTotal = Number(inv.totalAmount ?? inv.subtotal ?? 0);
      const invPaid = Number(inv.paidAmount ?? (inv.paymentStatus === "PAID" ? invTotal : 0));
      const invDue = Number(inv.dueAmount ?? Math.max(0, invTotal - invPaid));

      totalRevenue += invPaid > 0 ? invPaid : (inv.paymentStatus === "PAID" ? invTotal : 0);
      pendingDueAmount += invDue;
    });

    const lowStockProducts = [];
    let outOfStockCount = 0;

    lowStockProductsRaw.forEach((prod) => {
      const threshold = prod.lowStockAlert ?? 5;
      if (prod.stock <= threshold) {
        lowStockProducts.push({
          id: String(prod._id),
          _id: String(prod._id),
          name: prod.name,
          stock: prod.stock,
          lowStockAlert: threshold,
          categoryName: prod.categoryId?.name || "General",
          updatedAt: prod.updatedAt || prod.createdAt,
        });
      }
      if (prod.stock === 0) {
        outOfStockCount++;
      }
    });

    const topSellingProducts = topSellingAgg.map((item) => ({
      id: String(item._id),
      _id: String(item._id),
      name: item.productDetails?.name || "Product Item",
      quantitySold: item.quantitySold,
      revenue: item.revenue,
      sellingPrice: item.productDetails?.sellingPrice ?? 0,
      stock: item.productDetails?.stock ?? 0,
    }));

    const recentInvoices = validInvoices.slice(0, 10).map((inv) => ({
      id: String(inv._id),
      _id: String(inv._id),
      invoiceNumber: inv.invoiceNumber,
      customerName: inv.customerId?.name || inv.customerName || "Walk-in Customer",
      customerPhone: inv.customerId?.phone || inv.customerPhone || "",
      grandTotal: Number(inv.totalAmount ?? inv.subtotal ?? 0),
      totalAmount: Number(inv.totalAmount ?? inv.subtotal ?? 0),
      paidAmount: Number(inv.paidAmount ?? 0),
      dueAmount: Number(inv.dueAmount ?? 0),
      status: inv.paymentStatus === "PAID" ? "PAID" : inv.status === "CANCELLED" ? "CANCELLED" : "PENDING",
      paymentMethod: inv.paymentMethod || "CASH",
      createdAt: inv.createdAt,
    }));

    // Dynamic Sales Chart for selected date range
    const salesChart = [];
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.min(31, Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))));

    for (let i = diffDays - 1; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);

      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const dayInvoices = validInvoices.filter((inv) => {
        const invDate = new Date(inv.createdAt);
        return invDate >= dayStart && invDate <= dayEnd;
      });

      const daySales = dayInvoices.reduce(
        (sum, inv) => sum + Number(inv.totalAmount ?? inv.subtotal ?? 0),
        0
      );

      salesChart.push({
        date: dateStr,
        sales: daySales,
        invoicesCount: dayInvoices.length,
      });
    }

    const activities = [];

    validInvoices.slice(0, 10).forEach((inv) => {
      const custName = inv.customerId?.name || inv.customerName || "Walk-in Customer";
      const totalAmt = Number(inv.totalAmount ?? inv.subtotal ?? 0);
      const isPaid = inv.paymentStatus === "PAID";

      activities.push({
        id: `inv-${inv._id}`,
        referenceId: String(inv._id),
        type: isPaid ? "PAYMENT_RECEIVED" : "INVOICE_CREATED",
        title: isPaid ? `Invoice #${inv.invoiceNumber} Paid` : `Invoice #${inv.invoiceNumber} Created`,
        description: `₹${totalAmt} via ${inv.paymentMethod || "CASH"} for ${custName}`,
        createdAt: inv.createdAt,
        timestamp: inv.createdAt,
        icon: isPaid ? "CheckCircle2" : "FileText",
        color: isPaid ? "text-emerald-400" : "text-cyber-yellow",
      });
    });

    recentCustomers.forEach((cust) => {
      activities.push({
        id: `cust-${cust._id}`,
        referenceId: String(cust._id),
        type: "CUSTOMER_ADDED",
        title: "New Customer Registered",
        description: `${cust.name} (${cust.phone || "No phone"}) added to directory`,
        createdAt: cust.createdAt,
        timestamp: cust.createdAt,
        icon: "UserPlus",
        color: "text-blue-400",
      });
    });

    recentProducts.forEach((prod) => {
      const isLow = prod.stock <= (prod.lowStockAlert ?? 5);
      activities.push({
        id: `prod-${prod._id}`,
        referenceId: String(prod._id),
        type: isLow ? "STOCK_LOW" : "PRODUCT_ADDED",
        title: isLow ? `Low Stock Warning: ${prod.name}` : `Product Inventory Updated`,
        description: isLow
          ? `${prod.name} has only ${prod.stock} units left in stock`
          : `${prod.name} (Stock: ${prod.stock}, Price: ₹${prod.sellingPrice})`,
        createdAt: prod.updatedAt || prod.createdAt,
        timestamp: prod.updatedAt || prod.createdAt,
        icon: isLow ? "AlertTriangle" : "Package",
        color: isLow ? "text-red-400" : "text-purple-400",
      });
    });

    recentCategories.forEach((cat) => {
      activities.push({
        id: `cat-${cat._id}`,
        referenceId: String(cat._id),
        type: "CATEGORY_CREATED",
        title: "Category Created",
        description: `Category "${cat.name}" added`,
        createdAt: cat.createdAt,
        timestamp: cat.createdAt,
        icon: "FolderPlus",
        color: "text-amber-400",
      });
    });

    activities.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const recentActivities = activities.slice(0, 10);

    const overview = {
      totalRevenue,
      todayRevenue: totalRevenue,
      monthlyRevenue: totalRevenue,
      invoiceCount: validInvoices.length,
      customerCount: activeCustomersCount,
      productCount: totalProductsCount,
      categoryCount: totalCategoriesCount,
      pendingDueAmount,
    };

    const responseData = {
      range,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      overview,
      recentActivities,
      lowStockProducts,
      topSellingProducts,
      recentInvoices,
      salesChart,
      inventorySummary: {
        totalProducts: totalProductsCount,
        lowStockCount: lowStockProducts.length,
        outOfStockCount,
      },
      customerSummary: {
        totalCustomers: totalCustomersCount,
        activeCustomers: activeCustomersCount,
      },
      todaySales: totalRevenue,
      totalRevenue,
      totalInvoices: validInvoices.length,
      totalCustomers: activeCustomersCount,
      pendingDues: pendingDueAmount,
      lowStockProductsCount: lowStockProducts.length,
      lowStockProducts: lowStockProducts.length,
      lowStockItemsCount: lowStockProducts.length,
      topProducts: topSellingProducts,
      stats: {
        totalRevenue,
        todaySales: totalRevenue,
        totalInvoices: validInvoices.length,
        totalCustomers: activeCustomersCount,
        pendingDues: pendingDueAmount,
        lowStockItemsCount: lowStockProducts.length,
      },
    };

    return res.status(200).json({
      success: true,
      message: "Dashboard loaded successfully",
      data: responseData,
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
  return getSummary(req, res);
};

module.exports = {
  getSummary,
  getActivity,
};
