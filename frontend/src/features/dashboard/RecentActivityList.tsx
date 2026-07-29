import React from 'react';
import { FileText, UserPlus, AlertTriangle, CheckCircle2, Package, FolderPlus, Activity } from 'lucide-react';
import type { RecentActivity } from '../../types/dashboard.types';
import { formatDate } from '../../utils/formatters';

interface RecentActivityListProps {
  activities?: RecentActivity[];
}

export const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities = [] }) => {
  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'INVOICE_CREATED':
        return <FileText size={16} className="text-cyber-yellow" />;
      case 'CUSTOMER_ADDED':
        return <UserPlus size={16} className="text-blue-400" />;
      case 'STOCK_LOW':
        return <AlertTriangle size={16} className="text-red-400" />;
      case 'PRODUCT_ADDED':
        return <Package size={16} className="text-purple-400" />;
      case 'CATEGORY_CREATED':
        return <FolderPlus size={16} className="text-amber-400" />;
      case 'PAYMENT_RECEIVED':
        return <CheckCircle2 size={16} className="text-emerald-400" />;
      default:
        return <Activity size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="bg-surface/50 border border-white/10 p-6 rounded-3xl space-y-4">
      <h3 className="text-sm font-black uppercase tracking-wider text-white">
        Recent Activity & Operations
      </h3>

      {activities.length === 0 ? (
        <div className="py-8 text-center text-gray-400 flex flex-col items-center gap-2">
          <Activity size={24} className="text-gray-500" />
          <span className="text-xs font-medium">No recent operations logged yet.</span>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="p-2 bg-surface rounded-xl border border-white/10 shrink-0">
                {getActivityIcon(act.type)}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white truncate">{act.title}</h4>
                  <span className="text-[10px] text-gray-500 font-mono shrink-0 ml-2">
                    {formatDate(act.createdAt || act.timestamp)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5 font-medium line-clamp-1">
                  {act.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
