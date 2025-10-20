import React from 'react';
import Hero from '@/widgets/hero/ui';
import Movies from '@/widgets/movies/ui';
import FeaturesSection from '@/widgets/features-cards/ui';
import QuoteSection from '@/widgets/quote/ui';
import CommunitySection from '@/widgets/community/ui';
import Reminder from '@/widgets/reminder/ui';

export default function index() {
  return (
    <div className="custom-container">
      <Hero />
      <Movies />
      <FeaturesSection />
      <QuoteSection />
      <CommunitySection />
      <Reminder />
    </div>
  );
}
