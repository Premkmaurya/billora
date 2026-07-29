import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { DashboardStats, DashboardSummaryData, RecentActivity } from '../types/dashboard.types';
import type { ApiResponse } from '../types/api.types';

export interface DashboardQueryParams {
  range?: string;
  from?: string;
  to?: string;
}

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardSummary: builder.query<ApiResponse<DashboardSummaryData>, DashboardQueryParams | void>({
      query: (params) => ({
        url: API_ROUTES.DASHBOARD.SUMMARY || '/dashboard/summary',
        method: 'GET',
        params: params || {},
      }),
      providesTags: ['Dashboard'],
    }),
    getDashboardStats: builder.query<ApiResponse<{ stats: DashboardStats; todaySales: number; totalRevenue: number }>, void>({
      query: () => ({
        url: API_ROUTES.DASHBOARD.STATS || '/dashboard/stats',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getRecentActivity: builder.query<ApiResponse<RecentActivity[]>, void>({
      query: () => ({
        url: API_ROUTES.DASHBOARD.ACTIVITY || '/dashboard/activity',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
} = dashboardApi;
