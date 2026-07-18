import React from 'react';
import { AboutHero } from '../components/about/AboutHero';
import { AboutStory } from '../components/about/AboutStory';
import { AboutMissionValues } from '../components/about/AboutMissionValues';
import { AboutBuiltWithOwners } from '../components/about/AboutBuiltWithOwners';
import { AboutWhyChoose } from '../components/about/AboutWhyChoose';
import { AboutJourney } from '../components/about/AboutJourney';
import { AboutCTA } from '../components/about/AboutCTA';

const AboutPage: React.FC = () => {
  return (
    <main className="w-full">
      {/* 2. Hero Section (Yellow background) */}
      <AboutHero />

      {/* 3. Our Story Section (Black background) */}
      <AboutStory />

      {/* 4 & 5. Mission, Vision & Core Values Section (Yellow background) */}
      <AboutMissionValues />

      {/* 6. Built with Shop Owners Section (Black background) */}
      <AboutBuiltWithOwners />

      {/* 7. Why Businesses Choose Billora Outcomes (Yellow background) */}
      <AboutWhyChoose />

      {/* 8. Journey Timeline Milestones (Black background) */}
      <AboutJourney />

      {/* 9. Final About CTA Section (Yellow background) */}
      <AboutCTA />
    </main>
  );
};

export default AboutPage;
