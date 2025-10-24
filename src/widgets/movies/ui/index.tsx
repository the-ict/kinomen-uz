'use client';

import React from 'react';
import MovieCard from './movie-card';
import { IPost } from '@/shared/config/api/posts/posts.model';

interface Props {
  movies: IPost[];
}

export default function index({ movies }: Props) {
  return (
    <section className="grid grid-cols-7 gap-10 w-full pt-[100px]" id="movies">
      {Array.isArray(movies) &&
        movies
          .slice(0, 5)
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} type="home" />
          ))}
    </section>
  );
}
