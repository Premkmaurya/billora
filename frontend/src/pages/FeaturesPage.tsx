import React, { useEffect } from 'react';
import { FeaturesHero } from '../components/features/FeaturesHero';
import { WhyBillora } from '../components/home/WhyBillora';
import { ProductShowcase } from '../components/home/ProductShowcase';
import { FeatureInvoicing } from '../components/features/FeatureInvoicing';
import { FeatureInventoryCustomers } from '../components/features/FeatureInventoryCustomers';
import { FeatureReportsShowcase } from '../components/features/FeatureReportsShowcase';
import { FeatureGSTCompliance } from '../components/features/FeatureGSTCompliance';
import { FeaturePaymentsDemo } from '../components/features/FeaturePaymentsDemo';
import { FeatureAutomationCards } from '../components/features/FeatureAutomationCards';
import { FeaturesHowItWorks } from '../components/features/FeaturesHowItWorks';
import { BuiltFor } from '../components/features/BuiltFor';
import { Integrations } from '../components/features/Integrations';
import { Security } from '../components/features/Security';
import { Testimonials } from '../components/home/Testimonials';
import { Pricing } from '../components/home/Pricing';
import { Compare } from '../components/features/Compare';
import { FeaturesFAQ } from '../components/features/FeaturesFAQ';
import { CTASection } from '../components/home/CTASection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturesPage: React.FC = () => {
  useEffect(() => {
    // Reveal components on scroll
    gsap.fromTo(
      '.feat-page-reveal',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
        scrollTrigger: {
          trigger: '.feat-page-trigger',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="w-full bg-dark-bg text-white relative">
      
      {/* 1. Hero Section */}
      <FeaturesHero />

      {/* 3. Outcomes Introduction (Why Billora) */}
      <WhyBillora />

      {/* 4. Cinematic Interactive Tour (Product Showcase) */}
      <ProductShowcase />

      {/* 5. Deep Dives (Alternating layout blocks) */}
      <FeatureInvoicing />
      <FeatureInventoryCustomers />
      <FeatureReportsShowcase />
      <FeatureGSTCompliance />
      <FeaturePaymentsDemo />
      <FeatureAutomationCards />

      {/* 6. Onboarding Timeline */}
      <FeaturesHowItWorks />

      {/* 7. Built For Niches (Asymmetrical cards) */}
      <BuiltFor />

      {/* 8. Integrations Compatibility badging */}
      <Integrations />

      {/* 9. Security & Trust columns */}
      <Security />

      {/* 10. Testimonials Slider */}
      <Testimonials />

      {/* 11. Comparison Table */}
      <Compare />

      {/* 12. Pricing Switcher (Monthly vs Yearly) */}
      <Pricing />

      {/* 13. FAQ Accordions */}
      <FeaturesFAQ />

      {/* 14. Final Conversion CTA */}
      <CTASection />

    </div>
  );
};

export default FeaturesPage;
