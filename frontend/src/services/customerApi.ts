import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { Customer, CreateCustomerData, UpdateCustomerData, CustomerQueryParams } from '../types/customer.types';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';

export const customerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<ApiResponse<PaginatedResponse<Customer>>, CustomerQueryParams | void>({
      query: (params) => ({
        url: API_ROUTES.CUSTOMERS.BASE,
        method: 'GET',
        params: params || {},
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'Customers' as const, id })),
              { type: 'Customers', id: 'LIST' },
            ]
          : [{ type: 'Customers', id: 'LIST' }],
    }),
    getCustomerById: builder.query<ApiResponse<Customer>, string>({
      query: (id) => ({
        url: API_ROUTES.CUSTOMERS.BY_ID(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Customers', id }],
    }),
    createCustomer: builder.mutation<ApiResponse<Customer>, CreateCustomerData>({
      query: (data) => ({
        url: API_ROUTES.CUSTOMERS.BASE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }, 'Dashboard'],
    }),
    updateCustomer: builder.mutation<ApiResponse<Customer>, { id: string; data: UpdateCustomerData }>({
      query: ({ id, data }) => ({
        url: API_ROUTES.CUSTOMERS.BY_ID(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Customers', id }, { type: 'Customers', id: 'LIST' }, 'Dashboard'],
    }),
    deleteCustomer: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: API_ROUTES.CUSTOMERS.BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Customers', id: 'LIST' }, 'Dashboard'],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
