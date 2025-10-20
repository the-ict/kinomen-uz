import Image from 'next/image';
import React from 'react';
import MoviePoster from '../../../../public/movieposter.jpg';
import { Eye, Heart, Star } from 'lucide-react';
import { Button } from '@/shared/ui/button';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  country: string;
  poster: string;
  rating: number;
}

interface MovieCardProps {
  movie: Movie;
  type?: 'home' | 'search';
}

export default function MovieCard({ movie, type }: MovieCardProps) {
  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(229,9,20,0.2)] transition-all duration-300">
      <div className="relative w-full h-[250px]">
        {' '}
        <Image
          src={movie.poster || MoviePoster}
          alt={movie.title}
          fill
          className="object-cover"
        />{' '}
        <div className="absolute group-hover:opacity-100 opacity-0 h-full w-full left-0 top-0 bg-black/70 flex items-center justify-center flex-col z-10 backdrop-blur-sm transition-all duration-300">
          {' '}
          <div className="flex items-center gap-1 flex-col mb-4">
            {' '}
            <Eye className="text-gray-200" size={24} />{' '}
            <span className="text-gray-300 text-sm">200.008k</span>{' '}
          </div>{' '}
          <div className="flex items-center gap-1 flex-col">
            {' '}
            <Heart className="text-red-500" size={24} />{' '}
            <span className="text-gray-300 text-sm">100k</span>{' '}
          </div>{' '}
        </div>{' '}
      </div>

      {type === 'search' && (
        <div className="p-4 text-gray-200">
          <h3 className="text-lg font-semibold truncate group-hover:text-[#e50914] transition-colors">
            {movie.title}
          </h3>

          <div className="flex flex-wrap items-center text-sm text-gray-400 mt-1 gap-2">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.genre}</span>
            <span>•</span>
            <span>{movie.country}</span>
          </div>

          {type === 'search' && (
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full border-[#e50914] text-[#e50914] hover:bg-[#e50914] hover:text-white transition-all"
              >
                Batafsil ko‘rish
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
