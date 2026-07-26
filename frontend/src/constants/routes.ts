export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  ABOUT: '/about',
  PRICING: '/pricing',
  PUBLIC_CUSTOMERS: '/customers-info',
  RESOURCES_GST: '/resources/how-to-create-gst-invoice',
  
  // Auth Routes
  LOGIN: '/login',
  REGISTER: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Protected SaaS Routes
  DASHBOARD: '/dashboard',
  PRODUCTS: '/dashboard/products',
  CUSTOMERS: '/dashboard/customers',
  INVOICES: '/dashboard/invoices',
  INVOICE_CREATE: '/dashboard/invoices/new',
  CATEGORIES: '/dashboard/categories',
  ORGANIZATION: '/dashboard/organization',
  SETTINGS: '/dashboard/settings',
} as const;
