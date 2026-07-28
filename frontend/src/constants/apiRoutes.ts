export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/signup',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },
  ORGANIZATION: {
    BASE: '/organization',
    MEMBERS: '/organization/members',
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: string) => `/categories/${id}`,
  },
  PRODUCTS: {
    BASE: '/products',
    BY_ID: (id: string) => `/products/${id}`,
  },
  CUSTOMERS: {
    BASE: '/customers',
    BY_ID: (id: string) => `/customers/${id}`,
  },
  INVOICES: {
    BASE: '/invoices',
    BY_ID: (id: string) => `/invoices/${id}`,
    STATUS: (id: string) => `/invoices/${id}/status`,
  },
  DASHBOARD: {
    SUMMARY: '/dashboard/summary',
    STATS: '/dashboard/stats',
    ACTIVITY: '/dashboard/activity',
  },
} as const;
