import React from 'react';
import { X, Printer } from 'lucide-react';
import type { Invoice } from '../../types/invoice.types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useOrganization } from '../../hooks/useOrganization';

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice | null;
}

export const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ isOpen, onClose, invoice }) => {
  const { organization } = useOrganization();

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-3xl p-6 md:p-8 relative space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white">{invoice.invoiceNumber}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/20">
              {invoice.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-cyber-yellow text-dark-text font-extrabold text-xs rounded-xl flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <Printer size={14} />
              <span>Print Invoice</span>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Printable View */}
        <div className="bg-dark-bg p-6 rounded-2xl border border-white/5 space-y-6 text-xs text-gray-300">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-6">
            <div>
              <h3 className="text-lg font-black text-white mb-1">
                {organization?.name || 'Billora Store'}
              </h3>
              {organization?.gstin && <p className="font-mono text-cyber-yellow">GSTIN: {organization.gstin}</p>}
              <p className="text-gray-400">{organization?.address || 'India'}</p>
              <p className="text-gray-400">Phone: {organization?.phone || '+91 9876543210'}</p>
            </div>

            <div className="text-right space-y-1">
              <p className="text-sm font-bold text-white">TAX INVOICE</p>
              <p className="font-mono text-gray-400">Date: {formatDate(invoice.createdAt)}</p>
              <p className="font-mono text-gray-400">Pay Mode: {invoice.paymentMethod}</p>
            </div>
          </div>

          {/* Billed To */}
          <div className="bg-surface/50 p-4 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1">Billed To</p>
            <p className="text-sm font-bold text-white">{invoice.customerName}</p>
            {invoice.customerPhone && <p className="font-mono text-gray-400">Phone: {invoice.customerPhone}</p>}
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-bold text-white uppercase text-[10px]">
                  <th className="py-2.5">Item</th>
                  <th className="py-2.5">Qty</th>
                  <th className="py-2.5">Rate</th>
                  <th className="py-2.5">GST %</th>
                  <th className="py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-semibold text-white">{item.productName}</td>
                    <td className="py-2.5 font-mono">{item.quantity}</td>
                    <td className="py-2.5 font-mono">{formatCurrency(item.unitPrice)}</td>
                    <td className="py-2.5 font-mono text-cyber-yellow">{item.taxRate}%</td>
                    <td className="py-2.5 text-right font-mono font-bold text-white">
                      {formatCurrency(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex flex-col items-end space-y-1.5 border-t border-white/10 pt-4 font-mono">
            <div className="flex justify-between w-48 text-gray-400">
              <span>Subtotal:</span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between w-48 text-cyber-yellow">
              <span>CGST:</span>
              <span>{formatCurrency(invoice.cgst)}</span>
            </div>
            <div className="flex justify-between w-48 text-cyber-yellow">
              <span>SGST:</span>
              <span>{formatCurrency(invoice.sgst)}</span>
            </div>
            {invoice.discount > 0 && (
              <div className="flex justify-between w-48 text-emerald-400">
                <span>Discount:</span>
                <span>-{formatCurrency(invoice.discount)}</span>
              </div>
            )}
            <div className="flex justify-between w-48 font-black text-sm text-white border-t border-white/10 pt-2">
              <span>Grand Total:</span>
              <span>{formatCurrency(invoice.grandTotal)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-bold rounded-xl hover:text-white"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
