import { useCurrentUser } from './useCurrentUser';
import type { UserRole } from '../types/auth.types';

export const usePermissions = () => {
  const user = useCurrentUser();

  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user || !user.role) return false;
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    return requiredRoles.includes(user.role);
  };

  const isAdmin = hasRole('ADMIN');
  const isManager = hasRole(['ADMIN', 'MANAGER']);
  const canManageProducts = hasRole(['ADMIN', 'MANAGER']);
  const canManageCustomers = hasRole(['ADMIN', 'MANAGER', 'CASHIER']);
  const canCreateInvoices = hasRole(['ADMIN', 'MANAGER', 'CASHIER', 'STAFF']);
  const canManageOrganization = hasRole('ADMIN');

  return {
    hasRole,
    isAdmin,
    isManager,
    canManageProducts,
    canManageCustomers,
    canCreateInvoices,
    canManageOrganization,
    role: user?.role || 'ADMIN',
  };
};
