import React from 'react';
import { X, Printer, FileText } from 'lucide-react';
import type { Invoice } from '../../types/invoice.types';
import { useGetInvoiceByIdQuery } from '../../services/invoiceApi';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useOrganization } from '../../hooks/useOrganization';

interface InvoiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice?: Invoice | null;
}

export const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ isOpen, onClose, invoice }) => {
  const { organization } = useOrganization();

  const { data: detailData, isLoading } = useGetInvoiceByIdQuery(invoice?.id || '', {
    skip: !isOpen || !invoice?.id,
  });

  if (!isOpen || !invoice) return null;

  const activeInvoice: any = detailData?.data || (detailData as any)?.invoice || invoice;
  const items = Array.isArray(activeInvoice?.items) ? activeInvoice.items : [];

  const handlePrint = () => {
    window.print();
  };

  const subtotal = Number(activeInvoice?.subtotal ?? activeInvoice?.totalAmount ?? 0);
  const taxTotal = Number(activeInvoice?.taxTotal ?? activeInvoice?.taxAmount ?? 0);
  const cgst = Number(activeInvoice?.cgst ?? taxTotal / 2);
  const sgst = Number(activeInvoice?.sgst ?? taxTotal / 2);
  const discount = Number(activeInvoice?.discount ?? activeInvoice?.discountAmount ?? 0);
  const grandTotal = Number(activeInvoice?.grandTotal ?? activeInvoice?.totalAmount ?? 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-3xl p-6 md:p-8 relative space-y-6 my-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-white">{activeInvoice.invoiceNumber || 'Invoice Details'}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/20">
              {activeInvoice.status || 'COMPLETED'}
            </span>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-cyber-yellow text-dark-text font-extrabold text-xs rounded-xl flex items-center gap-1.5 hover:scale-105 transition-all cursor-pointer"
            >
              <Printer size={14} />
              <span>Print Invoice</span>
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 cursor-pointer">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Printable View */}
        <div className="bg-dark-bg p-6 rounded-2xl border border-white/5 space-y-6 text-xs text-gray-300 print:bg-white print:text-black print:p-0 print:border-none">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-6 print:border-black/20">
            <div>
              <h3 className="text-lg font-black text-white mb-1 print:text-black">
                {organization?.name || (organization as any)?.businessName || 'Billora Store'}
              </h3>
              {organization?.gstin && <p className="font-mono text-cyber-yellow print:text-black">GSTIN: {organization.gstin}</p>}
              <p className="text-gray-400 print:text-black">{organization?.address || 'Store Location'}</p>
              <p className="text-gray-400 print:text-black">Phone: {organization?.phone || '+91 9876543210'}</p>
            </div>

            <div className="text-right space-y-1">
              <p className="text-sm font-bold text-white print:text-black">TAX INVOICE</p>
              <p className="font-mono text-gray-400 print:text-black">
                Date: {activeInvoice.createdAt ? formatDate(activeInvoice.createdAt) : 'N/A'}
              </p>
              <p className="font-mono text-gray-400 print:text-black">
                Pay Mode: {activeInvoice.paymentMethod || 'CASH'}
              </p>
            </div>
          </div>

          {/* Billed To */}
          <div className="bg-surface/50 p-4 rounded-xl border border-white/5 print:bg-gray-100 print:border-black/10">
            <p className="text-[10px] uppercase tracking-wider font-extrabold text-gray-400 mb-1 print:text-black">Billed To</p>
            <p className="text-sm font-bold text-white print:text-black">{activeInvoice.customerName || 'Walk-in Customer'}</p>
            {activeInvoice.customerPhone && <p className="font-mono text-gray-400 print:text-black">Phone: {activeInvoice.customerPhone}</p>}
          </div>

          {/* Line Items Table */}
          {isLoading ? (
            <div className="py-8 text-center text-gray-400">Loading invoice details...</div>
          ) : items.length === 0 ? (
            <div className="py-8 text-center text-gray-400 flex flex-col items-center gap-2">
              <FileText size={24} />
              <span>No line items found for this invoice.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 font-bold text-white uppercase text-[10px] print:border-black/20 print:text-black">
                    <th className="py-2.5">Item</th>
                    <th className="py-2.5">Qty</th>
                    <th className="py-2.5">Rate</th>
                    <th className="py-2.5">GST %</th>
                    <th className="py-2.5 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-black/10">
                  {items.map((item: any, idx: number) => {
                    const name = item.productName || item.product?.name || 'Product';
                    const qty = Number(item.quantity ?? 1);
                    const rate = Number(item.unitPrice ?? item.sellingPrice ?? 0);
                    const gst = Number(item.taxRate ?? item.gstRate ?? 0);
                    const total = Number(item.total ?? qty * rate);

                    return (
                      <tr key={idx}>
                        <td className="py-2.5 font-semibold text-white print:text-black">{name}</td>
                        <td className="py-2.5 font-mono print:text-black">{qty}</td>
                        <td className="py-2.5 font-mono print:text-black">{formatCurrency(rate)}</td>
                        <td className="py-2.5 font-mono text-cyber-yellow print:text-black">{gst}%</td>
                        <td className="py-2.5 text-right font-mono font-bold text-white print:text-black">
                          {formatCurrency(total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Totals Calculation */}
          <div className="flex flex-col items-end space-y-1.5 border-t border-white/10 pt-4 font-mono print:border-black/20">
            <div className="flex justify-between w-48 text-gray-400 print:text-black">
              <span>Subtotal:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between w-48 text-cyber-yellow print:text-black">
              <span>CGST:</span>
              <span>{formatCurrency(cgst)}</span>
            </div>
            <div className="flex justify-between w-48 text-cyber-yellow print:text-black">
              <span>SGST:</span>
              <span>{formatCurrency(sgst)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between w-48 text-emerald-400 print:text-black">
                <span>Discount:</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}
            <div className="flex justify-between w-48 font-black text-sm text-white border-t border-white/10 pt-2 print:border-black/20 print:text-black">
              <span>Grand Total:</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          {activeInvoice.notes && (
            <div className="border-t border-white/10 pt-4 print:border-black/20">
              <p className="text-[10px] font-bold text-gray-400 uppercase print:text-black">Notes</p>
              <p className="text-gray-300 italic print:text-black">{activeInvoice.notes}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-2 print:hidden">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-bold rounded-xl hover:text-white cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
