import { api } from './api';
import { API_ROUTES } from '../constants/apiRoutes';
import type { DashboardStats, RecentActivity, SalesChartData } from '../types/dashboard.types';
import type { ApiResponse } from '../types/api.types';

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<ApiResponse<{ stats: DashboardStats; chartData: SalesChartData[] }>, void>({
      query: () => ({
        url: API_ROUTES.DASHBOARD.STATS,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
    getRecentActivity: builder.query<ApiResponse<RecentActivity[]>, void>({
      query: () => ({
        url: API_ROUTES.DASHBOARD.ACTIVITY,
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
} = dashboardApi;
