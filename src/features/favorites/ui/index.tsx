import React from 'react';
import MovieCard from '@/widgets/movies/ui/movie-card';

const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    country: 'USA',
    poster: '/movieposter.jpg',
    rating: 8.8,
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    genre: 'Sci-Fi',
    country: 'USA',
    poster: '/movieposter.jpg',
    rating: 8.6,
  },
];

export default function FavoritesPage() {
  return (
    <section className="custom-container mt-10">
      <h1 className="text-3xl font-bold mb-8">❤️ Sevimli filmlar</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {mockMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type="favorites" />
        ))}
      </div>
    </section>
  );
}
