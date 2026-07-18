import React from 'react';
import { Hero } from '../components/common/Hero';
import { TrustedBy } from '../components/home/TrustedBy';
import { ProductShowcase } from '../components/home/ProductShowcase';
import { WhyBillora } from '../components/home/WhyBillora';
import { FeaturesGrid } from '../components/home/FeaturesGrid';
import { ProblemSolution } from '../components/home/ProblemSolution';
import { HowItWorks } from '../components/home/HowItWorks';
import { BuiltFor } from '../components/home/BuiltFor';
import { Integrations } from '../components/home/Integrations';
import { DashboardShowcase } from '../components/home/DashboardShowcase';
import { Testimonials } from '../components/home/Testimonials';
import { Pricing } from '../components/home/Pricing';
import { FAQ } from '../components/home/FAQ';
import { CTASection } from '../components/home/CTASection';

const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 1. Hero Section (Yellow background) */}
      <Hero />

      {/* 2. Trust Section (Black background) */}
      <TrustedBy />

      {/* 3. Live Product Demo Showcase (Yellow background) */}
      <ProductShowcase />

      {/* 4. Why Billora Outcomes (Yellow background) */}
      <WhyBillora />

      {/* 5. Asymmetric Stripe-style Feature Grid (Yellow background) */}
      <FeaturesGrid />

      {/* 6. Problem -> Solution Storytelling (Black background) */}
      <ProblemSolution />

      {/* 7. How It Works Timeline (Yellow background) */}
      <HowItWorks />

      {/* 8. Built For Niches (Black background) */}
      <BuiltFor />

      {/* 9. Integrations Badges (Yellow background) */}
      <Integrations />

      {/* 10. Dashboard Showcase Parallax (Black background) */}
      <DashboardShowcase />

      {/* 11. Testimonials Slider (Yellow background) */}
      <Testimonials />

      {/* 12. Pricing (Black background) */}
      <Pricing />

      {/* 13. FAQ Accordion (Yellow background) */}
      <FAQ />

      {/* 14. Final CTA Urgency (Yellow background) */}
      <CTASection />
    </main>
  );
};

export default HomePage;
