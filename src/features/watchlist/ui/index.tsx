import React from 'react';
import OMDBMovieCard from '@/widgets/movies/ui/omdb-movie-card';
import { IMovie } from '@/features/create-analyses/ui/index';

const mockMovies: IMovie[] = [
  {
    Title: 'The Matrix',
    Year: '1999',
    imdbID: 'tt0133093',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    Title: 'Tenet',
    Year: '2020',
    imdbID: 'tt6723592',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjQtZjgzZi00MmQ2LWE5MzYtNGY0YTgxOWQ4NmIxXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg',
  },
];

export default function WatchlistPage() {
  return (
    <section className="custom-container mt-10">
      <h1 className="text-3xl font-bold mb-8">👀 Tomosha ro‘yxati</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {mockMovies.map((movie) => (
          <OMDBMovieCard key={movie.imdbID} movie={movie} type="watchlist" />
        ))}
      </div>
    </section>
  );
}
