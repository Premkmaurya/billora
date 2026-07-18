import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { AnnouncementBar } from "../components/common/AnnouncementBar";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import HomePage from "../pages/HomePage";
import FeaturesPage from "../pages/FeaturesPage";
import AboutPage from "../pages/AboutPage";
import PricingPage from "../pages/PricingPage";
import CustomerManagementPage from "../pages/CustomerManagementPage";
import ResourceArticlePage from "../pages/ResourceArticlePage";
import { LoginPage, SignupPage } from "../components/ui/demo";
import NotFoundPage from "../pages/NotFoundPage";

const MainLayout = () => {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {/* <Outlet /> acts as a placeholder for the nested pages */}
      <Outlet />
      <Footer />
    </>
  );
};

const AppRoutes: React.FC = () => (
  <div className="bg-dark-bg min-h-screen text-white relative font-sans selection:bg-dark-bg selection:text-cyber-yellow">
    {/* Page Routing */}
    <Routes>
      {/* --- Independent Routes (No Navbar, No Footer) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/customers" element={<CustomerManagementPage />} />
        <Route
          path="/resources/how-to-create-gst-invoice"
          element={<ResourceArticlePage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </div>
);

export default AppRoutes;
