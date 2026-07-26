import type { PaginationQueryParams } from './api.types';

export type InvoiceStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'CANCELLED';
export type PaymentMethod = 'CASH' | 'UPI' | 'CARD' | 'BANK_TRANSFER' | 'CREDIT';

export interface InvoiceItem {
  id?: string;
  productId: string;
  productName: string;
  sku?: string;
  hsnCode?: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  subtotal: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxTotal: number;
  cgst: number;
  sgst: number;
  discount: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  status: InvoiceStatus;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvoiceItemData {
  productId: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount?: number;
}

export interface CreateInvoiceData {
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  items: CreateInvoiceItemData[];
  discount?: number;
  paidAmount: number;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface UpdateInvoiceStatusData {
  status: InvoiceStatus;
  paidAmount?: number;
}

export interface InvoiceQueryParams extends PaginationQueryParams {
  status?: InvoiceStatus;
  startDate?: string;
  endDate?: string;
  customerId?: string;
}
