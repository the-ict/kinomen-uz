import React from 'react';
import MovieCard from './movie-card';

export default function index() {
  const mockMovies = [
    {
      id: 1,
      title: 'Movie 1',
      year: 2023,
      genre: 'Action',
      country: 'USA',
      poster: '',
      rating: 8.5,
    },
    {
      id: 2,
      title: 'Movie 2',
      year: 2022,
      genre: 'Comedy',
      country: 'UK',
      poster: '',
      rating: 7.8,
    },
    {
      id: 3,
      title: 'Movie 3',
      year: 2024,
      genre: 'Drama',
      country: 'France',
      poster: '',
      rating: 9.1,
    },
    {
      id: 4,
      title: 'Movie 4',
      year: 2021,
      genre: 'Horror',
      country: 'Germany',
      poster: '',
      rating: 6.9,
    },
    {
      id: 5,
      title: 'Movie 5',
      year: 2023,
      genre: 'Sci-Fi',
      country: 'Japan',
      poster: '',
      rating: 8.2,
    },
    {
      id: 6,
      title: 'Movie 6',
      year: 2022,
      genre: 'Action',
      country: 'USA',
      poster: '',
      rating: 7.5,
    },
    {
      id: 7,
      title: 'Movie 7',
      year: 2024,
      genre: 'Comedy',
      country: 'UK',
      poster: '',
      rating: 8.0,
    },
  ];

  return (
    <section className="grid grid-cols-7 gap-10 w-full mt-[100px]">
      {mockMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} type="home" />
      ))}
    </section>
  );
}
