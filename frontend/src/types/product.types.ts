import type { PaginationQueryParams } from './api.types';

export interface Product {
  id: string;
  _id?: string;
  name: string;
  sku: string;
  hsnCode?: string;
  price: number;
  sellingPrice?: number;
  costPrice?: number;
  stock: number;
  minStockAlert?: number;
  unit: string;
  taxRate: number;
  categoryId?: string;
  categoryName?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  sku: string;
  hsnCode?: string;
  price: number;
  costPrice?: number;
  stock: number;
  minStockAlert?: number;
  unit: string;
  taxRate: number;
  categoryId?: string;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  isActive?: boolean;
}

export interface ProductQueryParams extends PaginationQueryParams {
  categoryId?: string;
  lowStock?: boolean;
}
