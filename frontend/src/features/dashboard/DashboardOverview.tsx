import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  FileText,
  Package,
  Users,
  ArrowUpRight,
  BarChart3,
  AlertTriangle,
  Flame,
  Calendar,
} from "lucide-react";
import { useGetDashboardSummaryQuery } from "../../services/dashboardApi";
import { AnalyticsCards } from "./AnalyticsCards";
import { RecentActivityList } from "./RecentActivityList";
import { PageHeader } from "../../components/shared/PageHeader";
import { CardSkeleton, TableSkeleton } from "../../components/shared/Skeleton";
import { EmptyState } from "../../components/shared/EmptyState";
import { ErrorState } from "../../components/shared/ErrorState";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { ROUTES } from "../../constants/routes";

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState<string>("today");
  const [customFrom, setCustomFrom] = useState<string>("");
  const [customTo, setCustomTo] = useState<string>("");

  const queryParams = useMemo(() => {
    return {
      range: selectedRange,
      from: selectedRange === "custom" ? customFrom || undefined : undefined,
      to: selectedRange === "custom" ? customTo || undefined : undefined,
    };
  }, [selectedRange, customFrom, customTo]);

  const {
    data: summaryResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetDashboardSummaryQuery(queryParams);

  const isDataLoading = isLoading || isFetching;

  const summary = summaryResponse?.data;

  const overview = summary?.overview || {
    totalRevenue: summary?.totalRevenue || 0,
    todayRevenue: summary?.todaySales || 0,
    monthlyRevenue: 0,
    invoiceCount: summary?.totalInvoices || 0,
    customerCount: summary?.totalCustomers || 0,
    productCount: 0,
    categoryCount: 0,
    pendingDueAmount: summary?.pendingDues || 0,
  };

  const stats = summary?.stats || {
    totalRevenue: overview.totalRevenue,
    todaySales: overview.todayRevenue,
    totalInvoices: overview.invoiceCount,
    totalCustomers: overview.customerCount,
    pendingDues: overview.pendingDueAmount,
    lowStockItemsCount: summary?.lowStockProducts?.length || 0,
    revenueChange: 0,
    invoicesChange: 0,
    customersChange: 0,
    duesChange: 0,
  };

  const recentInvoices = summary?.recentInvoices || [];
  const recentActivities = summary?.recentActivities || [];
  const lowStockProducts = summary?.lowStockProducts || [];
  const topSellingProducts = summary?.topSellingProducts || [];

  const hasNoData =
    summary && overview.invoiceCount === 0 && recentInvoices.length === 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Store Dashboard Overview"
        subtitle="Live sales performance, inventory alerts, and quick checkout actions"
        action={
          <button
            onClick={() => navigate(ROUTES.INVOICE_CREATE)}
            className="px-5 py-3 bg-cyber-yellow text-dark-text font-black text-xs rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-cyber-yellow/20 cursor-pointer"
          >
            <Plus size={18} />
            <span>Create Quick Bill</span>
          </button>
        }
      />

      {/* Date Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface/50 border border-white/10 p-4 rounded-3xl shadow-lg">
        <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-wider">
          <Calendar size={18} className="text-cyber-yellow" />
          <span>Dashboard Filter:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="bg-surface border border-white/10 rounded-2xl px-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-cyber-yellow cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
            <option value="custom">Custom Date Range</option>
          </select>

          {selectedRange === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyber-yellow"
              />
              <span className="text-xs font-bold text-gray-400">to</span>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-cyber-yellow"
              />
            </div>
          )}
        </div>
      </div>

      {/* Analytics Stat Cards */}
      {isDataLoading ? (
        <CardSkeleton count={4} />
      ) : isError ? (
        <ErrorState
          title="Unable to connect to server"
          message="Failed to load dashboard metrics. Please verify backend server status."
          onRetry={refetch}
        />
      ) : (
        <AnalyticsCards stats={stats} />
      )}

      {/* Low Stock Alerts Section if any low stock products exist (Not filtered by date) */}
      {!isDataLoading && lowStockProducts.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle size={18} />
              <span>Low Stock Alerts ({lowStockProducts.length})</span>
            </div>
            <button
              onClick={() => navigate(ROUTES.PRODUCTS)}
              className="text-xs text-red-400 hover:underline font-bold cursor-pointer"
            >
              Restock Inventory →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {lowStockProducts.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="bg-surface/80 p-3 rounded-2xl border border-white/5 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white truncate">{prod.name}</h4>
                  <p className="text-[10px] text-gray-400 font-mono">Category: {prod.categoryName || 'General'}</p>
                </div>
                <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  {prod.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate(ROUTES.INVOICE_CREATE)}
          className="p-5 bg-surface/50 border border-white/10 rounded-3xl hover:border-cyber-yellow/40 transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyber-yellow/10 border border-cyber-yellow/20 flex items-center justify-center text-cyber-yellow">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyber-yellow transition-colors">
                New Invoice
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">
                Issue fast receipt with GST splits
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-gray-500 group-hover:text-cyber-yellow transition-colors"
          />
        </button>

        <button
          onClick={() => navigate(ROUTES.PRODUCTS)}
          className="p-5 bg-surface/50 border border-white/10 rounded-3xl hover:border-blue-500/40 transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Package size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                Manage Products
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">
                Update prices & stock limits
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-gray-500 group-hover:text-blue-400 transition-colors"
          />
        </button>

        <button
          onClick={() => navigate(ROUTES.CUSTOMERS)}
          className="p-5 bg-surface/50 border border-white/10 rounded-3xl hover:border-emerald-500/40 transition-all text-left flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                Customer Directory
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">
                Check ledgers & due balances
              </p>
            </div>
          </div>
          <ArrowUpRight
            size={18}
            className="text-gray-500 group-hover:text-emerald-400 transition-colors"
          />
        </button>
      </div>

      {/* Main Grid: Recent Invoices & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Invoices & Top Selling (span 8) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Recent Sales Invoices
              </h3>
              <button
                onClick={() => navigate(ROUTES.INVOICES)}
                className="text-xs text-cyber-yellow hover:underline font-bold cursor-pointer"
              >
                View All Invoices →
              </button>
            </div>

            {isDataLoading ? (
              <TableSkeleton rows={4} columns={4} />
            ) : hasNoData ? (
              <EmptyState
                title="No sales in selected date range"
                description="Try selecting another date filter or create your first invoice for this period."
                actionLabel="Create Invoice"
                onAction={() => navigate(ROUTES.INVOICE_CREATE)}
                icon={<BarChart3 size={28} />}
              />
            ) : (
              <div className="bg-surface/50 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-white font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-3.5 px-6">Invoice</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-6 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {recentInvoices.slice(0, 5).map((inv) => (
                      <tr
                        key={inv.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3.5 px-6 font-mono font-bold text-cyber-yellow">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-white">
                          {inv.customerName}
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 font-mono">
                          {formatDate(inv.createdAt)}
                        </td>
                        <td className="py-3.5 px-6 text-right font-black text-white font-mono">
                          {formatCurrency(
                            Number(inv.grandTotal ?? inv.totalAmount ?? 0)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Top Selling Products Block */}
          {!isDataLoading && topSellingProducts.length > 0 && (
            <div className="bg-surface/50 border border-white/10 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-wider">
                <Flame size={16} className="text-amber-400" />
                <span>Top Selling Products</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topSellingProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white/5 p-3.5 rounded-2xl border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{prod.name}</h4>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {prod.quantitySold} units sold
                      </p>
                    </div>
                    <div className="text-right font-mono font-bold text-xs text-cyber-yellow">
                      {formatCurrency(prod.revenue)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Recent Activity Feed (span 4) */}
        <div className="lg:col-span-4">
          <RecentActivityList activities={recentActivities} />
        </div>
      </div>
    </div>
  );
};
