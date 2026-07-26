import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { Organization, UpdateOrganizationData } from '../types/organization.types';
import type { ApiResponse } from '../types/api.types';

export const organizationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrganization: builder.query<ApiResponse<Organization>, void>({
      query: () => ({
        url: API_ROUTES.ORGANIZATION.BASE,
        method: 'GET',
      }),
      providesTags: ['Organization'],
    }),
    updateOrganization: builder.mutation<ApiResponse<Organization>, UpdateOrganizationData>({
      query: (data) => ({
        url: API_ROUTES.ORGANIZATION.BASE,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Organization'],
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useUpdateOrganizationMutation,
} = organizationApi;
