import React from 'react';
import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';
import { AnnouncementBar } from '../components/common/AnnouncementBar';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import AboutPage from '../pages/AboutPage';
import PricingPage from '../pages/PricingPage';
import CustomerManagementPage from '../pages/CustomerManagementPage';
import ResourceArticlePage from '../pages/ResourceArticlePage';
import NotFoundPage from '../pages/NotFoundPage';

import { AppLayout } from '../components/layout/AppLayout';
import { AuthLayout } from '../components/layout/AuthLayout';
import { AuthGuard } from '../features/auth/AuthGuard';
import { GuestGuard } from '../features/auth/GuestGuard';

import { LoginForm } from '../features/auth/LoginForm';
import { RegisterForm } from '../features/auth/RegisterForm';
import { ForgotPasswordForm } from '../features/auth/ForgotPasswordForm';

import { DashboardOverview } from '../features/dashboard/DashboardOverview';
import { ProductList } from '../features/products/ProductList';
import { CustomerList } from '../features/customers/CustomerList';
import { InvoiceList } from '../features/invoices/InvoiceList';
import { InvoiceForm } from '../features/invoices/InvoiceForm';
import { CategoryList } from '../features/categories/CategoryList';
import { OrganizationSettings } from '../features/organization/OrganizationSettings';

const PublicLandingLayout: React.FC = () => {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const AuthCardWrapper: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
    <div className="bg-surface border border-white/10 p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl">
      <div className="text-center space-y-2">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-cyber-yellow flex items-center justify-center font-black text-dark-text text-xl">
            B
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">Billora</span>
        </Link>
        <h2 className="text-xl font-bold text-white pt-2">{title}</h2>
        <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
      </div>

      {children}
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* --- Guest Auth Routes --- */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <GuestGuard>
              <AuthCardWrapper
                title="Sign in to your account"
                subtitle="Enter your email and password below to sign in"
              >
                <LoginForm />
                <div className="text-center text-xs text-gray-400 font-medium pt-2">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="text-cyber-yellow font-bold hover:underline">
                    Sign up
                  </Link>
                </div>
              </AuthCardWrapper>
            </GuestGuard>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestGuard>
              <AuthCardWrapper
                title="Create a new account"
                subtitle="Set up your shop profile and start billing in under 10 seconds"
              >
                <RegisterForm />
                <div className="text-center text-xs text-gray-400 font-medium pt-2">
                  Already have an account?{' '}
                  <Link to="/login" className="text-cyber-yellow font-bold hover:underline">
                    Sign in
                  </Link>
                </div>
              </AuthCardWrapper>
            </GuestGuard>
          }
        />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route
          path="/forgot-password"
          element={
            <GuestGuard>
              <AuthCardWrapper
                title="Reset your password"
                subtitle="Enter your email address to receive password reset instructions"
              >
                <ForgotPasswordForm />
              </AuthCardWrapper>
            </GuestGuard>
          }
        />
      </Route>

      {/* --- Protected Dashboard SaaS Routes --- */}
      <Route
        element={
          <AuthGuard>
            <AppLayout />
          </AuthGuard>
        }
      >
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/dashboard/products" element={<ProductList />} />
        <Route path="/dashboard/customers" element={<CustomerList />} />
        <Route path="/dashboard/invoices" element={<InvoiceList />} />
        <Route path="/dashboard/invoices/new" element={<InvoiceForm />} />
        <Route path="/dashboard/categories" element={<CategoryList />} />
        <Route path="/dashboard/organization" element={<OrganizationSettings />} />
        <Route path="/dashboard/settings" element={<OrganizationSettings />} />
      </Route>

      {/* --- Public Landing Marketing Routes --- */}
      <Route element={<PublicLandingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/customers-info" element={<CustomerManagementPage />} />
        <Route path="/resources/how-to-create-gst-invoice" element={<ResourceArticlePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
