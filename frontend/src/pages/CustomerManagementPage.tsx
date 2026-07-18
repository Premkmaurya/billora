import React from 'react';
import { CustomerHero } from '../components/customers/CustomerHero';
import { CustomerBenefits } from '../components/customers/CustomerBenefits';
import { CustomerProfileShowcase } from '../components/customers/CustomerProfileShowcase';
import { CustomerPurchaseHistory } from '../components/customers/CustomerPurchaseHistory';
import { CustomerOutstandingPayments } from '../components/customers/CustomerOutstandingPayments';
import { CustomerSmartFeatures } from '../components/customers/CustomerSmartFeatures';
import { CustomerBuiltFor } from '../components/customers/CustomerBuiltFor';
import { CustomerCTA } from '../components/customers/CustomerCTA';

const CustomerManagementPage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 2. Hero Section (Yellow background) */}
      <CustomerHero />

      {/* 3. Why Customer Management Matters (Black background) */}
      <CustomerBenefits />

      {/* 4. Customer Profile Showcase (Yellow background) */}
      <CustomerProfileShowcase />

      {/* 5. Purchase History Timeline (Black background) */}
      <CustomerPurchaseHistory />

      {/* 6. Outstanding Payments Recovery (Yellow background) */}
      <CustomerOutstandingPayments />

      {/* 7. Smart Features Staggered Grid (Black background) */}
      <CustomerSmartFeatures />

      {/* 8. Built for Real Businesses (Yellow background) */}
      <CustomerBuiltFor />

      {/* 9. Final Customer CTA Section (Yellow background) */}
      <CustomerCTA />
    </main>
  );
};

export default CustomerManagementPage;
