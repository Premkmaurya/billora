import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { Invoice, CreateInvoiceData, UpdateInvoiceStatusData, InvoiceQueryParams } from '../types/invoice.types';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';

export const invoiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<ApiResponse<PaginatedResponse<Invoice>>, InvoiceQueryParams | void>({
      query: (params) => ({
        url: API_ROUTES.INVOICES.BASE,
        method: 'GET',
        params: params || {},
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'Invoices' as const, id })),
              { type: 'Invoices', id: 'LIST' },
            ]
          : [{ type: 'Invoices', id: 'LIST' }],
    }),
    getInvoiceById: builder.query<ApiResponse<Invoice>, string>({
      query: (id) => ({
        url: API_ROUTES.INVOICES.BY_ID(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Invoices', id }],
    }),
    createInvoice: builder.mutation<ApiResponse<Invoice>, CreateInvoiceData>({
      query: (data) => ({
        url: API_ROUTES.INVOICES.BASE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Invoices', id: 'LIST' }, 'Products', 'Customers', 'Dashboard'],
    }),
    updateInvoiceStatus: builder.mutation<ApiResponse<Invoice>, { id: string; data: UpdateInvoiceStatusData }>({
      query: ({ id, data }) => ({
        url: API_ROUTES.INVOICES.STATUS(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Invoices', id },
        { type: 'Invoices', id: 'LIST' },
        'Customers',
        'Dashboard',
      ],
    }),
    deleteInvoice: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: API_ROUTES.INVOICES.BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Invoices', id: 'LIST' }, 'Products', 'Customers', 'Dashboard'],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceStatusMutation,
  useDeleteInvoiceMutation,
} = invoiceApi;
