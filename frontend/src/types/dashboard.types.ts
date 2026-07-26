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
