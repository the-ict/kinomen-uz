'use client';

import Image from 'next/image';
import React from 'react';
import { Heart, AlignVerticalDistributeEndIcon } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { IMovie } from '@/features/create-analyses/ui/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import user_requests from '@/shared/config/api/user/user.requests';
import { UserBodyModels } from '@/shared/config/api/user/user.models';

interface OMDBMovieCardProps {
  movie: IMovie;
  type?: 'favorites' | 'watchlist';
  me: UserBodyModels
}

export default function OMDBMovieCard({ movie, type, me }: OMDBMovieCardProps) {
  const queryClient = useQueryClient();

  const addToWatchList = useMutation({
    mutationKey: ['add-to-watchlist'],
    mutationFn: () => user_requests.watchlist(String(movie.imdbID)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    }
  });

  const handleAddToWatchlist = () => {
    addToWatchList.mutate();
  };
  
  return (
    <div className="bg-[#141414] border border-white/10 relative rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(229,9,20,0.2)] transition-all duration-300">
      <div className="relative w-full h-[250px]">
        <Image
          src={movie.Poster !== 'N/A' ? movie.Poster : ''}
          alt={movie.Title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />

        <div className="absolute top-4 right-2 px-3 py-2 cursor-pointer bg-yellow-400 rounded text-black font-bold">
          {movie.Title}
        </div>

        <div className="absolute justify-center gap-5 group-hover:opacity-100 opacity-0 h-full w-full left-0 top-0 bg-black/70 flex items-center flex-col z-10 backdrop-blur-sm transition-all duration-300">
          <Button
            onClick={handleAddToWatchlist}
            variant="outline"
            className="flex cursor-pointer items-center gap-2 border-gray-500 text-gray-400 hover:bg-red-600 hover:text-white transition-all"
          >
           {
            Array.isArray(me?.watchlist) && me.watchlist.includes(String(movie.imdbID)) ? (
              <p className='flex items-center gap-2'><AlignVerticalDistributeEndIcon /> Watchlistdan o'chirish</p>
            ) : (
              <p className='flex items-center gap-2'><AlignVerticalDistributeEndIcon /> Watchlistga qo'shish</p>
            )
           }
          </Button>
        </div>
      </div>
    </div>
  );
}
