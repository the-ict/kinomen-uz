import React from 'react';
import MovieCard from '@/widgets/movies/ui/movie-card';

const mockMovies = [
  {
    id: 3,
    title: 'The Matrix',
    year: 1999,
    genre: 'Action',
    country: 'USA',
    poster: '/movieposter.jpg',
    rating: 8.7,
  },
  {
    id: 4,
    title: 'Tenet',
    year: 2020,
    genre: 'Thriller',
    country: 'UK',
    poster: '/movieposter.jpg',
    rating: 7.5,
  },
];

export default function WatchlistPage() {
  return (
    <section className="custom-container mt-10">
      <h1 className="text-3xl font-bold mb-8">👀 Tomosha ro‘yxati</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {mockMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type="watchlist" />
        ))}
      </div>
    </section>
  );
}
