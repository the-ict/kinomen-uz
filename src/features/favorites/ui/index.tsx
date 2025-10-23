import React from 'react';
import OMDBMovieCard from '@/widgets/movies/ui/omdb-movie-card';
import { IMovie } from '@/features/create-analyses/ui/index';

const mockMovies: IMovie[] = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    Title: 'Interstellar',
    Year: '2014',
    imdbID: 'tt0816692',
    Type: 'movie',
    Poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  },
];

export default function FavoritesPage() {
  return (
    <section className="custom-container mt-10">
      <h1 className="text-3xl font-bold mb-8">❤️ Sevimli filmlar</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {mockMovies.map((movie) => (
          <OMDBMovieCard key={movie.imdbID} movie={movie} type="favorites" />
        ))}
      </div>
    </section>
  );
}
