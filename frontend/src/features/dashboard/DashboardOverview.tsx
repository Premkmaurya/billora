import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, Package, Users, ArrowUpRight } from 'lucide-react';
import { useGetDashboardStatsQuery } from '../../services/dashboardApi';
import { useGetInvoicesQuery } from '../../services/invoiceApi';
import { AnalyticsCards } from './AnalyticsCards';
import { RecentActivityList } from './RecentActivityList';
import { PageHeader } from '../../components/shared/PageHeader';
import { CardSkeleton, TableSkeleton } from '../../components/shared/Skeleton';
import { ErrorState } from '../../components/shared/ErrorState';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ROUTES } from '../../constants/routes';

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const { data: statsData, isLoading: isStatsLoading, isError: isStatsError, refetch: refetchStats } = useGetDashboardStatsQuery();
  const { data: invoicesData, isLoading: isInvoicesLoading } = useGetInvoicesQuery({ page: 1, limit: 5 });

  const stats = statsData?.data?.stats;
  const recentInvoices = invoicesData?.data?.items || [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Store Dashboard Overview"
        subtitle="Live sales performance, inventory alerts, and quick checkout actions"
        action={
          <button
            onClick={() => navigate(ROUTES.INVOICE_CREATE)}
            className="px-5 py-3 bg-cyber-yellow text-dark-text font-black text-xs rounded-2xl hover:scale-105 transition-all flex items-center gap-2 shadow-xl shadow-cyber-yellow/20"
          >
            <Plus size={18} />
            <span>Create Quick Bill</span>
          </button>
        }
      />

      {/* Analytics Stat Cards */}
      {isStatsLoading ? (
        <CardSkeleton count={4} />
      ) : isStatsError ? (
        <ErrorState onRetry={refetchStats} />
      ) : (
        <AnalyticsCards stats={stats} />
      )}

      {/* Quick Action Shortcuts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate(ROUTES.INVOICE_CREATE)}
          className="p-5 bg-surface/50 border border-white/10 rounded-3xl hover:border-cyber-yellow/40 transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyber-yellow/10 border border-cyber-yellow/20 flex items-center justify-center text-cyber-yellow">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyber-yellow transition-colors">
                New Invoice
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">Issue fast receipt with GST splits</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-gray-500 group-hover:text-cyber-yellow transition-colors" />
        </button>

        <button
          onClick={() => navigate(ROUTES.PRODUCTS)}
          className="p-5 bg-surface/50 border border-white/10 rounded-3xl hover:border-blue-500/40 transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Package size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                Manage Products
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">Update prices & stock limits</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
        </button>

        <button
          onClick={() => navigate(ROUTES.CUSTOMERS)}
          className="p-5 bg-surface/50 border border-white/10 rounded-3xl hover:border-emerald-500/40 transition-all text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                Customer Directory
              </h4>
              <p className="text-[11px] text-gray-400 font-medium">Check ledgers & due balances</p>
            </div>
          </div>
          <ArrowUpRight size={18} className="text-gray-500 group-hover:text-emerald-400 transition-colors" />
        </button>
      </div>

      {/* Main Grid: Recent Invoices & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Invoices Table (span 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wider text-white">
              Recent Sales Invoices
            </h3>
            <button
              onClick={() => navigate(ROUTES.INVOICES)}
              className="text-xs text-cyber-yellow hover:underline font-bold"
            >
              View All Invoices →
            </button>
          </div>

          {isInvoicesLoading ? (
            <TableSkeleton rows={4} columns={4} />
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
                    <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-6 font-mono font-bold text-cyber-yellow">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">{inv.customerName}</td>
                      <td className="py-3.5 px-4 text-gray-400 font-mono">{formatDate(inv.createdAt)}</td>
                      <td className="py-3.5 px-6 text-right font-black text-white font-mono">
                        {formatCurrency(inv.grandTotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Recent Activity Feed (span 4) */}
        <div className="lg:col-span-4">
          <RecentActivityList />
        </div>
      </div>
    </div>
  );
};
