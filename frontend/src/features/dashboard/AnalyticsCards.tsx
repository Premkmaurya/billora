import React from 'react';
import { IndianRupee, FileText, Users, AlertCircle, TrendingUp } from 'lucide-react';
import type { DashboardStats } from '../../types/dashboard.types';
import { formatCurrency } from '../../utils/formatters';

interface AnalyticsCardsProps {
  stats?: DashboardStats;
}

export const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats?.totalRevenue || 0),
      change: stats?.revenueChange ? `+${stats.revenueChange}%` : '+12.5%',
      icon: IndianRupee,
      color: 'text-cyber-yellow',
      bg: 'bg-cyber-yellow/10',
      border: 'border-cyber-yellow/20',
    },
    {
      title: 'Invoices Generated',
      value: (stats?.totalInvoices || 0).toLocaleString('en-IN'),
      change: stats?.invoicesChange ? `+${stats.invoicesChange}%` : '+8.2%',
      icon: FileText,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      title: 'Active Customers',
      value: (stats?.totalCustomers || 0).toLocaleString('en-IN'),
      change: stats?.customersChange ? `+${stats.customersChange}%` : '+15.4%',
      icon: Users,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      title: 'Pending Dues Ledger',
      value: formatCurrency(stats?.pendingDues || 0),
      change: stats?.duesChange ? `-${stats.duesChange}%` : 'Outstanding',
      icon: AlertCircle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-surface/50 border border-white/10 p-6 rounded-3xl space-y-4 hover:border-white/20 transition-all shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`w-10 h-10 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center ${card.color}`}>
                <Icon size={20} />
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-white font-mono tracking-tight">
                {card.value}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[11px] font-bold font-mono text-emerald-400">
                <TrendingUp size={12} />
                <span>{card.change} vs last month</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
