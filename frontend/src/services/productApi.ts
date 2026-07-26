import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { Product, CreateProductData, UpdateProductData, ProductQueryParams } from '../types/product.types';
import type { ApiResponse, PaginatedResponse } from '../types/api.types';

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<PaginatedResponse<Product>>, ProductQueryParams | void>({
      query: (params) => ({
        url: API_ROUTES.PRODUCTS.BASE,
        method: 'GET',
        params: params || {},
      }),
      providesTags: (result) =>
        result?.data?.items
          ? [
              ...result.data.items.map(({ id }) => ({ type: 'Products' as const, id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query<ApiResponse<Product>, string>({
      query: (id) => ({
        url: API_ROUTES.PRODUCTS.BY_ID(id),
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Products', id }],
    }),
    createProduct: builder.mutation<ApiResponse<Product>, CreateProductData>({
      query: (data) => ({
        url: API_ROUTES.PRODUCTS.BASE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }, 'Dashboard', 'Categories'],
    }),
    updateProduct: builder.mutation<ApiResponse<Product>, { id: string; data: UpdateProductData }>({
      query: ({ id, data }) => ({
        url: API_ROUTES.PRODUCTS.BY_ID(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }, 'Dashboard'],
    }),
    deleteProduct: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: API_ROUTES.PRODUCTS.BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }, 'Dashboard', 'Categories'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
