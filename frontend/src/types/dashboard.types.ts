export interface DashboardOverviewData {
  totalRevenue: number;
  todayRevenue: number;
  monthlyRevenue: number;
  invoiceCount: number;
  customerCount: number;
  productCount: number;
  categoryCount: number;
  pendingDueAmount: number;
}

export interface RecentActivity {
  id: string;
  referenceId?: string;
  type: 'INVOICE_CREATED' | 'CUSTOMER_ADDED' | 'STOCK_LOW' | 'PRODUCT_ADDED' | 'CATEGORY_CREATED' | 'PAYMENT_RECEIVED' | string;
  title: string;
  description: string;
  createdAt: string;
  timestamp: string;
  icon?: string;
  color?: string;
}

export interface LowStockProductData {
  id: string;
  name: string;
  stock: number;
  lowStockAlert: number;
  categoryName?: string;
  updatedAt?: string;
}

export interface TopSellingProductData {
  id: string;
  name: string;
  quantitySold: number;
  revenue: number;
  sellingPrice?: number;
  stock?: number;
}

export interface RecentInvoiceData {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone?: string;
  grandTotal: number;
  totalAmount: number;
  paidAmount?: number;
  dueAmount?: number;
  status: string;
  paymentMethod?: string;
  createdAt: string;
}

export interface SalesChartData {
  date: string;
  sales: number;
  invoicesCount: number;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalInvoices: number;
  invoicesChange: number;
  totalCustomers: number;
  customersChange: number;
  pendingDues: number;
  duesChange: number;
  todaySales: number;
  lowStockItemsCount: number;
}

export interface DashboardSummaryData {
  overview: DashboardOverviewData;
  recentActivities: RecentActivity[];
  lowStockProducts: LowStockProductData[];
  topSellingProducts: TopSellingProductData[];
  recentInvoices: RecentInvoiceData[];
  salesChart: SalesChartData[];
  inventorySummary: {
    totalProducts: number;
    lowStockCount: number;
    outOfStockCount: number;
  };
  customerSummary: {
    totalCustomers: number;
    activeCustomers: number;
  };
  todaySales: number;
  totalRevenue: number;
  totalInvoices: number;
  totalCustomers: number;
  pendingDues: number;
  lowStockProductsCount?: number;
  topProducts?: TopSellingProductData[];
  stats: DashboardStats;
}
