"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import user_requests from '@/shared/config/api/user/user.requests';
import IMDBIdMovie from '@/widgets/imdbIdMovie/ui';

export default function WatchlistPage() {
  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => user_requests.getMe(),
  });

  return (
    <section className="custom-container my-10">
      <h1 className="text-3xl font-bold mb-8">👀 Tomosha ro‘yxati</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.isArray(me.data?.watchlist) &&
          me.data?.watchlist.map((movie) => (
            <IMDBIdMovie key={movie} movieId={movie} me={me.data} />
          ))}
      </div>
    </section>
  );
}
