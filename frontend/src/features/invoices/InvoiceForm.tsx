import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, CheckCircle, Calculator } from "lucide-react";
import { useGetProductsQuery } from "../../services/productApi";
import { useGetCustomersQuery } from "../../services/customerApi";
import { useCreateInvoiceMutation } from "../../services/invoiceApi";
import type {
  CreateInvoiceItemData,
  PaymentMethod,
} from "../../types/invoice.types";
import { PageHeader } from "../../components/shared/PageHeader";
import { formatCurrency } from "../../utils/formatters";
import { notifySuccess, notifyError } from "../../utils/notifications";
import { LoadingSpinner } from "../../components/shared/LoadingSpinner";
import { ROUTES } from "../../constants/routes";

export const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const { data: productsData } = useGetProductsQuery({ limit: 100 });
  const { data: customersData } = useGetCustomersQuery({ limit: 100 });
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();

  const products = useMemo(() => {
    if (!productsData) return [];
    if (Array.isArray(productsData.data)) return productsData.data;
    if (Array.isArray((productsData as any).products)) return (productsData as any).products;
    if (Array.isArray((productsData as any).items)) return (productsData as any).items;
    return [];
  }, [productsData]);

  const customers = useMemo(() => {
    if (!customersData) return [];
    if (Array.isArray(customersData.data)) return customersData.data;
    if (Array.isArray((customersData as any).customers)) return (customersData as any).customers;
    if (Array.isArray((customersData as any).items)) return (customersData as any).items;
    return [];
  }, [customersData]);

  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("Walk-in Customer");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [discount, setDiscount] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [notes, setNotes] = useState("");

  const [items, setItems] = useState<CreateInvoiceItemData[]>([
    { productId: "", quantity: 1, sellingPrice: 0, taxRate: 18, unitPrice: 0 },
  ]);

  const handleCustomerSelect = (id: string) => {
    setSelectedCustomerId(id);
    const found = customers.find((c: any) => String(c.id || c._id) === String(id));
    if (found) {
      setCustomerName(found.name);
      setCustomerPhone(found.phone || "");
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof CreateInvoiceItemData,
    value: unknown,
  ) => {
    const updated = [...items];
    const current = { ...updated[index], [field]: value };

    if (field === "productId") {
      const prod = products.find(
        (p: any) => String(p.id || p._id) === String(value)
      );
      if (prod) {
        const price = Number(prod.sellingPrice ?? prod.price ?? 0);
        const rate = Number(prod.gstRate ?? prod.taxRate ?? 0);
        current.sellingPrice = price;
        current.unitPrice = price;
        current.taxRate = rate;
        current.gstRate = rate;
      } else {
        current.sellingPrice = 0;
        current.unitPrice = 0;
        current.taxRate = 0;
        current.gstRate = 0;
      }
    }

    if (field === "quantity") {
      current.quantity = Math.max(1, Number(value) || 1);
    }

    updated[index] = current;
    setItems(updated);
  };

  const addItemRow = () => {
    setItems([
      ...items,
      { productId: "", quantity: 1, sellingPrice: 0, taxRate: 18, unitPrice: 0 },
    ]);
  };

  const removeItemRow = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Memoized Invoice Calculations
  const { subtotal, taxTotal, grandTotal } = useMemo(() => {
    let sub = 0;
    let tax = 0;

    items.forEach((item) => {
      const qty = Math.max(0, Number(item.quantity ?? 0));
      const price = Math.max(
        0,
        Number(item.sellingPrice ?? item.unitPrice ?? 0)
      );
      const rate = Math.max(
        0,
        Number(item.taxRate ?? item.gstRate ?? 0)
      );

      const lineSubtotal = qty * price;
      const lineTax = (lineSubtotal * rate) / 100;

      sub += lineSubtotal;
      tax += lineTax;
    });

    const disc = Math.max(0, Number(discount ?? 0));
    const grand = Math.max(0, sub + tax - disc);

    return {
      subtotal: Number.isNaN(sub) ? 0 : sub,
      taxTotal: Number.isNaN(tax) ? 0 : tax,
      grandTotal: Number.isNaN(grand) ? 0 : grand,
    };
  }, [items, discount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validItems = items.filter((i) => i.productId && i.quantity > 0);
    if (validItems.length === 0) {
      notifyError("Empty Bill", "Please add at least one valid product item");
      return;
    }

    try {
      const payloadItems = validItems.map((item) => ({
        productId: String(item.productId),
        quantity: Math.max(1, Number(item.quantity || 1)),
        sellingPrice: Number(item.sellingPrice ?? item.unitPrice ?? 0),
        unitPrice: Number(item.sellingPrice ?? item.unitPrice ?? 0),
        taxRate: Number(item.taxRate ?? item.gstRate ?? 0),
        gstRate: Number(item.taxRate ?? item.gstRate ?? 0),
        discount: Number(item.discount ?? 0),
      }));

      const finalPaid = paidAmount > 0 ? Number(paidAmount) : grandTotal;

      await createInvoice({
        customerId: selectedCustomerId || undefined,
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        items: payloadItems as any,
        discount: Number(discount || 0),
        paidAmount: finalPaid,
        paymentMethod,
        notes: notes || undefined,
      }).unwrap();

      notifySuccess(
        "Invoice Generated!",
        `Printed invoice for ${customerName}`,
      );
      navigate(ROUTES.INVOICES);
    } catch {
      // Handled globally
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Create New Tax Invoice"
        subtitle="10-second fast checkout counter bill generator"
      />

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Left Form: Items & Customer details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Selection */}
          <div className="bg-surface/50 border border-white/10 p-6 rounded-3xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-cyber-yellow">
              Customer Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Select Existing Customer
                </label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => handleCustomerSelect(e.target.value)}
                  className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow"
                >
                  <option value="">-- Walk-in / New Customer --</option>
                  {customers.map((c: any) => (
                    <option key={c.id || c._id} value={c.id || c._id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-cyber-yellow"
                />
              </div>
            </div>
          </div>

          {/* Line Items Calculator Table */}
          <div className="bg-surface/50 border border-white/10 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-widest text-cyber-yellow">
                Invoice Line Items
              </h3>
              <button
                type="button"
                onClick={addItemRow}
                className="px-3 py-1.5 bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/20 rounded-xl text-xs font-bold hover:bg-cyber-yellow/20 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> Add Product Row
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => {
                const itemPrice = Number(item.sellingPrice ?? item.unitPrice ?? 0);
                const itemQty = Number(item.quantity ?? 1);
                const itemLineTotal = itemQty * itemPrice;

                return (
                  <div
                    key={index}
                    className="grid grid-cols-10 gap-2 items-center bg-white/5 p-3 rounded-2xl"
                  >
                    <div className="col-span-5">
                      <select
                        value={item.productId}
                        onChange={(e) =>
                          handleItemChange(index, "productId", e.target.value)
                        }
                        required
                        className="w-full bg-surface border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow"
                      >
                        <option value="">-- Select Product --</option>
                        {products.map((p: any) => {
                          const pId = p.id || p._id;
                          const pPrice = Number(p.sellingPrice ?? p.price ?? 0);
                          return (
                            <option key={pId} value={pId}>
                              {p.name} (₹{pPrice}) - Stock: {p.stock ?? 0}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "quantity",
                            Number(e.target.value),
                          )
                        }
                        placeholder="Qty"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow font-mono text-center"
                      />
                    </div>

                    <div className="col-span-2 text-right font-mono font-bold text-xs text-white">
                      {formatCurrency(Number.isNaN(itemLineTotal) ? 0 : itemLineTotal)}
                    </div>

                    <div className="col-span-1 text-center">
                      <button
                        type="button"
                        onClick={() => removeItemRow(index)}
                        className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary & Checkout Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface border border-white/10 p-6 rounded-3xl space-y-6 sticky top-24">
            <h3 className="text-xs font-black uppercase tracking-widest text-cyber-yellow flex items-center gap-2">
              <Calculator size={16} /> Payment Tally
            </h3>

            <div className="space-y-3 border-b border-white/10 pb-4 text-xs font-mono">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-cyber-yellow">
                <span>GST Tax (CGST + SGST)</span>
                <span>+{formatCurrency(taxTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Discount (₹)</span>
                <input
                  type="number"
                  min="0"
                  value={discount}
                  onChange={(e) => setDiscount(Math.max(0, Number(e.target.value) || 0))}
                  className="w-24 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-right text-xs font-mono text-white focus:outline-none focus:border-cyber-yellow"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-base font-black text-white font-mono">
              <span>Grand Total</span>
              <span className="text-cyber-yellow text-lg">
                {formatCurrency(grandTotal)}
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as PaymentMethod)
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow"
                >
                  <option className="text-black" value="CASH">Cash Payment</option>
                  <option className="text-black" value="UPI">UPI Scan & Pay</option>
                  <option className="text-black" value="CARD">Debit / Credit Card</option>
                  <option className="text-black" value="BANK_TRANSFER">Bank Transfer</option>
                  <option className="text-black" value="CREDIT">Customer Credit Ledger</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Amount Received (₹)
                </label>
                <input
                  type="number"
                  value={paidAmount || grandTotal}
                  onChange={(e) => setPaidAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyber-yellow"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                  Invoice Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Thank you for shopping!"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-yellow resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-cyber-yellow text-dark-text font-black text-sm rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-cyber-yellow/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <LoadingSpinner size={18} />
              ) : (
                <>
                  <CheckCircle size={18} /> Complete & Issue Bill
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
