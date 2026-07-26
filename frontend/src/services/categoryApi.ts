import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { Category, CreateCategoryData, UpdateCategoryData } from '../types/category.types';
import type { ApiResponse } from '../types/api.types';

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<Category[]>, void>({
      query: () => ({
        url: API_ROUTES.CATEGORIES.BASE,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<ApiResponse<Category>, CreateCategoryData>({
      query: (data) => ({
        url: API_ROUTES.CATEGORIES.BASE,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<ApiResponse<Category>, { id: string; data: UpdateCategoryData }>({
      query: ({ id, data }) => ({
        url: API_ROUTES.CATEGORIES.BY_ID(id),
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: API_ROUTES.CATEGORIES.BY_ID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories', 'Products'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
