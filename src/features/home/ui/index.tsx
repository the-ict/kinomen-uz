'use client';

import React from 'react';
import Hero from '@/widgets/hero/ui';
import Movies from '@/widgets/movies/ui';
import FeaturesSection from '@/widgets/features-cards/ui';
import QuoteSection from '@/widgets/quote/ui';
import CommunitySection from '@/widgets/community/ui';
import Reminder from '@/widgets/reminder/ui';
import { useQuery } from '@tanstack/react-query';
import { movie_requests } from '@/shared/config/api/movie/movie.requests';

export default function HomePage() {
  const movies = useQuery({
    queryKey: ['popular-movies'],
    queryFn: () => movie_requests.getPopulerMovies(),
  }).data;
  return (
    <div className="custom-container">
      {Array.isArray(movies) && <Hero movies={movies} />}
      {Array.isArray(movies) && <Movies movies={movies} />}
      <FeaturesSection />
      <QuoteSection />
      <CommunitySection />
      <Reminder />
    </div>
  );
}
