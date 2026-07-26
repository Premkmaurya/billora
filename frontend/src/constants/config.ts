export const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  APP_NAME: 'Billora',
  APP_VERSION: '1.0.0',
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_CURRENCY: 'INR',
} as const;
