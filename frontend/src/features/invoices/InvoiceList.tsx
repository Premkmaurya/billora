import React, { useState } from 'react';
import { Plus, Search, Eye, Trash2, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetInvoicesQuery, useDeleteInvoiceMutation } from '../../services/invoiceApi';
import type { Invoice, InvoiceStatus } from '../../types/invoice.types';
import { InvoiceDetailsModal } from './InvoiceDetailsModal';
import { PageHeader } from '../../components/shared/PageHeader';
import { TableSkeleton } from '../../components/shared/Skeleton';
import { EmptyState } from '../../components/shared/EmptyState';
import { ErrorState } from '../../components/shared/ErrorState';
import { useDebounce } from '../../hooks/useDebounce';
import { usePagination } from '../../hooks/usePagination';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { notifySuccess } from '../../utils/notifications';
import { ROUTES } from '../../constants/routes';

export const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | ''>('');
  const debouncedSearch = useDebounce(searchTerm, 350);

  const { page, limit, goToNextPage, goToPreviousPage } = usePagination();

  const { data, isLoading, isError, refetch } = useGetInvoicesQuery({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: statusFilter || undefined,
  });

  const [deleteInvoice] = useDeleteInvoiceMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices = data?.data || [];
  const totalPages = data?.meta || 1;

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDelete = async (invoice: Invoice) => {
    if (window.confirm(`Delete invoice "${invoice.invoiceNumber}"?`)) {
      try {
        await deleteInvoice(invoice.id).unwrap();
        notifySuccess('Invoice Deleted', `Removed "${invoice.invoiceNumber}"`);
      } catch {
        // Handled globally
      }
    }
  };

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={12} /> PAID
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock size={12} /> PENDING
          </span>
        );
      case 'OVERDUE':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle size={12} /> OVERDUE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-gray-500/10 text-gray-400 border border-gray-500/20">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Invoices"
        subtitle="Manage cash sales, UPI checkout bills, customer invoices, and print receipts"
        action={
          <button
            onClick={() => navigate(ROUTES.INVOICE_CREATE)}
            className="px-4 py-2.5 bg-cyber-yellow text-dark-text font-black text-xs rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-cyber-yellow/10"
          >
            <Plus size={16} />
            <span>Create Invoice</span>
          </button>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-surface/40 p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by invoice number, customer name..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyber-yellow"
          />
        </div>

        <div className="w-full sm:w-44">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus)}
            className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow"
          >
            <option value="">All Statuses</option>
            <option value="PAID">Paid Only</option>
            <option value="PENDING">Pending Only</option>
            <option value="OVERDUE">Overdue Only</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton rows={6} columns={6} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : invoices.length === 0 ? (
        <EmptyState
          title="No Invoices Found"
          description="Create your first bill to experience under 10-second checkout printing."
          actionLabel="Create Invoice"
          onAction={() => navigate(ROUTES.INVOICE_CREATE)}
          icon={<FileText size={28} />}
        />
      ) : (
        <div className="bg-surface/50 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-bold uppercase tracking-wider">
                  <th className="py-4 px-6 font-mono">Invoice No</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Date</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Mode</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-cyber-yellow">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-white">{invoice.customerName}</div>
                      {invoice.customerPhone && (
                        <div className="text-[10px] text-gray-400 font-mono">
                          {invoice.customerPhone}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-300 font-mono">
                      {formatDate(invoice.createdAt)}
                    </td>
                    <td className="py-4 px-4 font-black text-white text-sm font-mono">
                      {formatCurrency(invoice.totalAmount)}
                    </td>
                    <td className="py-4 px-4 font-mono text-gray-300">
                      {invoice.paymentMethod}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewInvoice(invoice)}
                          className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                          title="View / Print Receipt"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(invoice)}
                          className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                          title="Delete Invoice"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">
                Page <strong className="text-white">{page}</strong> of <strong className="text-white">{totalPages}</strong>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={page <= 1}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300 hover:text-white disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-300 hover:text-white disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <InvoiceDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
};
