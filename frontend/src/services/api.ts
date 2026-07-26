import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { CONFIG } from '../constants/config';
import { clearAuth } from '../lib/redux/authSlice';
import { notifyError } from '../utils/notifications';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: CONFIG.API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const status = result.error.status;

    if (status === 401) {
      // Clear auth on 401 Unauthorized
      api.dispatch(clearAuth());
    } else if (status === 500) {
      notifyError('Internal Server Error', 'Something went wrong on the server. Please try again later.');
    } else if (status === 403) {
      notifyError('Permission Denied', 'You do not have permission to perform this action.');
    } else if (status === 404) {
      // Resource not found
    } else if (typeof status === 'number' && status >= 400) {
      const errData = result.error.data as { message?: string } | undefined;
      if (errData?.message) {
        notifyError('Error', errData.message);
      }
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Products', 'Customers', 'Invoices', 'Categories', 'Dashboard', 'Organization', 'User'],
  endpoints: () => ({}),
});
