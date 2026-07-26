export type UserRole = 'ADMIN' | 'MANAGER' | 'CASHIER' | 'STAFF';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: UserRole;
  organizationId?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  fullName?: string;
  email: string;
  password: string;
  organizationName?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
}

export interface AuthApiResponse {
  success: boolean;
  message?: string;
  user?: User;
  errors?: Array<{ field?: string; message: string }>;
}
