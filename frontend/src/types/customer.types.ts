import type { PaginationQueryParams } from './api.types';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gstin?: string;
  outstandingBalance: number;
  totalPurchases: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerData {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  gstin?: string;
}

export interface UpdateCustomerData extends Partial<CreateCustomerData> {
  outstandingBalance?: number;
}

export interface CustomerQueryParams extends PaginationQueryParams {
  hasBalance?: boolean;
}
