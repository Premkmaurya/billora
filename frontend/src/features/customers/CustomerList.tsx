import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Users, Phone, Mail, AlertCircle } from 'lucide-react';
import { useGetCustomersQuery, useDeleteCustomerMutation } from '../../services/customerApi';
import type { Customer } from '../../types/customer.types';
import { CustomerModal } from './CustomerModal';
import { PageHeader } from '../../components/shared/PageHeader';
import { TableSkeleton } from '../../components/shared/Skeleton';
import { EmptyState } from '../../components/shared/EmptyState';
import { ErrorState } from '../../components/shared/ErrorState';
import { useDebounce } from '../../hooks/useDebounce';
import { usePagination } from '../../hooks/usePagination';
import { formatCurrency } from '../../utils/formatters';
import { notifySuccess } from '../../utils/notifications';

export const CustomerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasBalanceOnly, setHasBalanceOnly] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 350);

  const { page, limit, goToNextPage, goToPreviousPage } = usePagination();

  const { data, isLoading, isError, refetch } = useGetCustomersQuery({
    page,
    limit,
    search: debouncedSearch || undefined,
    hasBalance: hasBalanceOnly || undefined,
  });

  const [deleteCustomer] = useDeleteCustomerMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const customers = data?.data?.items || [];
  const totalPages = data?.data?.totalPages || 1;

  const handleOpenCreate = () => {
    setSelectedCustomer(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleDelete = async (customer: Customer) => {
    if (window.confirm(`Delete customer profile for "${customer.name}"?`)) {
      try {
        await deleteCustomer(customer.id).unwrap();
        notifySuccess('Customer Deleted', `Removed "${customer.name}"`);
      } catch {
        // Handled globally
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customer Directory & Credit Ledgers"
        subtitle="Manage customer profiles, purchase history, and outstanding due balances"
        action={
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2.5 bg-cyber-yellow text-dark-text font-black text-xs rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-cyber-yellow/10"
          >
            <Plus size={16} />
            <span>Add Customer</span>
          </button>
        }
      />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-surface/40 p-4 rounded-2xl border border-white/5 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone, email, GSTIN..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyber-yellow"
          />
        </div>

        <label className="flex items-center gap-2 text-xs text-gray-300 font-bold cursor-pointer select-none whitespace-nowrap">
          <input
            type="checkbox"
            checked={hasBalanceOnly}
            onChange={(e) => setHasBalanceOnly(e.target.checked)}
            className="rounded accent-cyber-yellow"
          />
          <span>Show Pending Dues Only</span>
        </label>
      </div>

      {isLoading ? (
        <TableSkeleton rows={5} columns={5} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : customers.length === 0 ? (
        <EmptyState
          title="No Customers Found"
          description="Keep track of customer ledgers and send automated invoice PDFs."
          actionLabel="Add First Customer"
          onAction={handleOpenCreate}
          icon={<Users size={28} />}
        />
      ) : (
        <div className="bg-surface/50 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-4">Contact Info</th>
                  <th className="py-4 px-4">GSTIN / Address</th>
                  <th className="py-4 px-4">Total Purchases</th>
                  <th className="py-4 px-4">Pending Dues</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {customers.map((customer) => {
                  const hasDues = customer.outstandingBalance > 0;
                  return (
                    <tr key={customer.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-sm">{customer.name}</div>
                      </td>
                      <td className="py-4 px-4 space-y-1">
                        <div className="flex items-center gap-1.5 font-mono text-gray-300">
                          <Phone size={12} className="text-cyber-yellow" />
                          <span>{customer.phone}</span>
                        </div>
                        {customer.email && (
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                            <Mail size={10} />
                            <span>{customer.email}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {customer.gstin ? (
                          <span className="font-mono text-cyber-yellow block text-[11px]">
                            {customer.gstin}
                          </span>
                        ) : null}
                        <span className="text-[10px] text-gray-500 line-clamp-1">
                          {customer.address || 'No address specified'}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-white">
                        {formatCurrency(customer.totalPurchases)}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                            hasDues
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {hasDues && <AlertCircle size={12} />}
                          {formatCurrency(customer.outstandingBalance)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(customer)}
                            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5"
                            title="Edit Customer"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(customer)}
                            className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10"
                            title="Delete Customer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
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

      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        customer={selectedCustomer}
      />
    </div>
  );
};
