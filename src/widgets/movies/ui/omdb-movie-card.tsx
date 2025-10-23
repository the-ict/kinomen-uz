'use client';

import Image from 'next/image';
import React from 'react';
import MoviePoster from '../../../../public/movieposter.jpg';
import { Eye, Heart, Trash2, Play } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { IMovie } from '@/features/create-analyses/ui/index';

interface OMDBMovieCardProps {
  movie: IMovie;
  type?: 'favorites' | 'watchlist';
}

export default function OMDBMovieCard({ movie, type }: OMDBMovieCardProps) {
  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(229,9,20,0.2)] transition-all duration-300">
      <div
        className="relative w-full h-[250px]"
        onClick={() => (window.location.href = `/single-movie/${movie.imdbID}`)}
      >
        <Image
          src={movie.Poster !== 'N/A' ? movie.Poster : MoviePoster.src}
          alt={movie.Title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />

        <div className="absolute top-4 right-2 px-3 py-2 cursor-pointer bg-yellow-400 rounded text-black font-bold">
          {movie.Title}
        </div>

        <div className="absolute group-hover:opacity-100 opacity-0 h-full w-full left-0 top-0 bg-black/70 flex items-center justify-center flex-col z-10 backdrop-blur-sm transition-all duration-300">
          <div className="flex items-center gap-1 flex-col mb-4">
            <Eye className="text-gray-200" size={24} />
            <span className="text-gray-300 text-sm">0</span>
          </div>
          <div className="flex items-center gap-1 flex-col">
            <Heart className="text-red-500" size={24} />
            <span className="text-gray-300 text-sm">0</span>
          </div>
        </div>
      </div>

      {type && (
        <div className="p-4 text-gray-200">
          {type === 'favorites' && (
            <div className="mt-4 flex justify-between items-center">
              <Button
                variant="outline"
                className="flex cursor-pointer items-center gap-2 border-[#e50914] text-[#e50914] hover:bg-[#e50914] hover:text-white transition-all"
                onClick={() =>
                  (window.location.href = `/single-movie/${movie.imdbID}`)
                }
              >
                <Play size={16} /> Ko'rish
              </Button>
              <Button
                variant="outline"
                className="flex cursor-pointer items-center gap-2 border-gray-500 text-gray-400 hover:bg-red-600 hover:text-white transition-all"
              >
                <Trash2 size={16} /> O'chirish
              </Button>
            </div>
          )}

          {type === 'watchlist' && (
            <div className="mt-4 flex justify-between items-start flex-col gap-5">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#e50914] w-full cursor-pointer text-[#e50914] hover:bg-[#e50914] hover:text-white transition-all"
                onClick={() =>
                  (window.location.href = `/single-movie/${movie.imdbID}`)
                }
              >
                <Play size={16} /> Tomosha qilish
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-gray-500 w-full cursor-pointer text-gray-400 hover:bg-yellow-600 hover:text-white transition-all"
              >
                <Trash2 size={16} /> Ro'yxatdan o'chirish
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
