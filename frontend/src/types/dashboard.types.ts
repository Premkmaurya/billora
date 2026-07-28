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

export interface RecentActivity {
  id: string;
  type: 'INVOICE_CREATED' | 'CUSTOMER_ADDED' | 'STOCK_LOW' | 'PAYMENT_RECEIVED';
  title: string;
  description: string;
  timestamp: string;
}

export interface SalesChartData {
  date: string;
  sales: number;
  invoicesCount: number;
}

export interface TopProductData {
  id: string;
  name: string;
  sku?: string;
  sellingPrice: number;
  stock: number;
}

export interface DashboardSummaryData {
  todaySales: number;
  totalRevenue: number;
  totalInvoices: number;
  totalCustomers: number;
  lowStockProducts: number;
  recentInvoices: Array<{
    id: string;
    invoiceNumber: string;
    customerName: string;
    grandTotal: number;
    totalAmount: number;
    status: string;
    createdAt: string;
  }>;
  topProducts: TopProductData[];
  salesChart: SalesChartData[];
  stats: DashboardStats;
}
