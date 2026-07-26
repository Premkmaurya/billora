import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { LoginCredentials, RegisterData, ForgotPasswordData, AuthApiResponse } from '../types/auth.types';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthApiResponse, LoginCredentials>({
      query: (credentials) => ({
        url: API_ROUTES.AUTH.LOGIN,
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User', 'Organization'],
    }),
    register: builder.mutation<AuthApiResponse, RegisterData>({
      query: (data) => ({
        url: API_ROUTES.AUTH.REGISTER,
        method: 'POST',
        body: {
          fullName: data.fullName || data.name,
          name: data.name,
          email: data.email,
          password: data.password,
          organizationName: data.organizationName,
        },
      }),
      invalidatesTags: ['User', 'Organization'],
    }),
    logout: builder.mutation<AuthApiResponse, void>({
      query: () => ({
        url: API_ROUTES.AUTH.LOGOUT,
        method: 'POST',
      }),
      invalidatesTags: ['Products', 'Customers', 'Invoices', 'Categories', 'Dashboard', 'Organization', 'User'],
    }),
    getMe: builder.query<AuthApiResponse, void>({
      query: () => ({
        url: API_ROUTES.AUTH.ME,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    forgotPassword: builder.mutation<AuthApiResponse, ForgotPasswordData>({
      query: (data) => ({
        url: API_ROUTES.AUTH.FORGOT_PASSWORD,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useForgotPasswordMutation,
} = authApi;
