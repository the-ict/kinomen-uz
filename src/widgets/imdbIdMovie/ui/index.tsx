'use client';

import Image from 'next/image';
import React from 'react';
import {
  AlignVerticalDistributeEndIcon,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import user_requests from '@/shared/config/api/user/user.requests';
import { UserBodyModels } from '@/shared/config/api/user/user.models';
import { movie_requests } from '@/shared/config/api/movie/movie.requests';

interface IMDBIdMovieProps {
  movieId: string;
  me: UserBodyModels;
}

export default function IMDBIdMovie({ movieId, me }: IMDBIdMovieProps) {
  const queryClient = useQueryClient();

  const movie = useQuery({
    queryKey: ['movie-by-id'],
    queryFn: () => movie_requests.getMovieByid(movieId),
  }).data;

  const addToWatchList = useMutation({
    mutationKey: ['add-to-watchlist'],
    mutationFn: () => user_requests.watchlist(String(movieId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
  });

  const handleAddToWatchlist = () => {
    addToWatchList.mutate();
  };

  if (movie === undefined) return null;

  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(229,9,20,0.2)] transition-all duration-300">
      <div className="relative w-full h-[250px]">
        <Image
          src={movie.Poster !== 'N/A' ? movie.Poster : '/movieposter.jpg'}
          alt={movie.Title || 'Movie Poster'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />

        <div className="absolute top-4 right-2 px-3 py-2 cursor-pointer bg-yellow-400 rounded text-black font-bold">
          {movie.Title}
        </div>

        <div className="absolute group-hover:opacity-100 opacity-0 h-full w-full left-0 top-0 bg-black/70 flex items-center justify-center flex-col z-10 backdrop-blur-sm transition-all duration-300">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWatchlist();
            }}
            variant="outline"
            className="mt-4 flex cursor-pointer items-center gap-2 border-gray-500 text-gray-400 hover:bg-red-600 hover:text-white transition-all"
          >
            {Array.isArray(me?.watchlist) &&
            me.watchlist.includes(String(movie.imdbID)) ? (
              <p className="flex items-center gap-2">
                <AlignVerticalDistributeEndIcon /> Watchlistdan o'chirish
              </p>
            ) : (
              <p className="flex items-center gap-2">
                <AlignVerticalDistributeEndIcon /> Watchlistga qo'shish
              </p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
