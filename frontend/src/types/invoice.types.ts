import type { PaginationQueryParams } from './api.types';

export type InvoiceStatus = 'PAID' | 'PENDING' | 'OVERDUE' | 'CANCELLED';
export type PaymentMethod = 'CASH' | 'UPI' | 'CARD' | 'BANK_TRANSFER' | 'CREDIT';

export interface InvoiceItem {
  id?: string;
  _id?: string;
  invoiceId?: string;
  productId: string;
  productName: string;
  sku?: string;
  hsnCode?: string;
  quantity: number;
  unitPrice: number;
  sellingPrice?: number;
  taxRate: number;
  gstRate?: number;
  taxAmount: number;
  subtotal: number;
  total: number;
  discount?: number;
  product?: {
    id?: string;
    _id?: string;
    name?: string;
    sku?: string;
  };
}

export interface Invoice {
  id: string;
  _id?: string;
  invoiceNumber: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customer?: {
    id?: string;
    _id?: string;
    name?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  taxAmount?: number;
  taxTotal?: number;
  cgst?: number;
  sgst?: number;
  discount?: number;
  discountAmount?: number;
  totalAmount?: number;
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
  unitPrice?: number;
  sellingPrice?: number;
  taxRate?: number;
  gstRate?: number;
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
