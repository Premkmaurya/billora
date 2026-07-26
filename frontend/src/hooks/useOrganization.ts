import { useAppSelector } from './useAppDispatch';
import { useGetOrganizationQuery } from '../services/organizationApi';
import type { Organization } from '../types/organization.types';

export const useOrganization = () => {
  const reduxOrg = useAppSelector((state) => state.organization.currentOrganization);
  const { data, isLoading, error, refetch } = useGetOrganizationQuery();

  const organization: Organization | null = data?.data || reduxOrg;

  return {
    organization,
    currency: organization?.currency || 'INR',
    taxRate: organization?.taxRate || 18,
    name: organization?.name || 'Billora Store',
    isLoading,
    error,
    refetch,
  };
};
