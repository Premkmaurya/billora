export interface Organization {
  id: string;
  name: string;
  gstin?: string;
  address?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  currency: string;
  taxRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrganizationData {
  name?: string;
  gstin?: string;
  address?: string;
  phone?: string;
  email?: string;
  currency?: string;
  taxRate?: number;
}
