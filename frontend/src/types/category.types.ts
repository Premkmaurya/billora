export interface Category {
  _id: string;
  name: string;
  description?: string;
  productCount?: number;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  organizationId?: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
}
