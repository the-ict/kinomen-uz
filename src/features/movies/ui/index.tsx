'use client';

import { useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ChevronDown, ChevronRight, Search, Star } from 'lucide-react';
import MovieCard from '@/widgets/movies/ui/movie-card';
import httpClient from '@/shared/config/api/httpClient';
import { ResWithPagination } from '@/shared/config/api/types';

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  country: string;
  poster: string;
  rating: number;
}

const fetchMovies = async ({
  pageParam = 1,
  search = '',
  genre = '',
  year = '',
  country = '',
  sort = 'latest',
}: {
  pageParam?: number;
  search?: string;
  genre?: string;
  year?: string;
  country?: string;
  sort?: string;
}): Promise<ResWithPagination<Movie>> => {
  const response = await httpClient.get('/movies', {
    params: {
      page: pageParam,
      search,
      genre,
      year,
      country,
      sort,
      _limit: 20,
    },
  });
  return response.data;
};

export default function MoviesPage() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [country, setCountry] = useState('');
  const [sort, setSort] = useState('latest');

  useMemo(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(timer);
  }, [search]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['movies', debouncedSearch, genre, year, country, sort],
    queryFn: ({ pageParam }) =>
      fetchMovies({
        pageParam,
        search: debouncedSearch,
        genre,
        year,
        country,
        sort,
      }),
    getNextPageParam: (lastPage) => lastPage.links.next,
    initialPageParam: 1,
  });

  const movies = data?.pages.flatMap((page) => page.data) || [];

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
  const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());
  const countries = ['USA', 'UK', 'France', 'Germany', 'Japan'];
  const sortOptions = [
    { value: 'latest', label: 'Eng oxirgi' },
    { value: 'most_rated', label: 'Eng yaxshi baholangani' },
    { value: 'most_viewed', label: "Eng ko'p ko'rilgani" },
  ];
  const [rating, setRating] = useState<number>(6)

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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="custom-container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Kinolar</h1>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Kino qidirish..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-[#161616] border-gray-700 text-white placeholder-gray-400 h-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-10">
                  <Button
                    variant="outline"
                    className="bg-[#161616] border-gray-700 text-white cursor-pointer"
                  >
                    Janr: {genre || 'Hammasi'} <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#161616] border-gray-700">
                  <DropdownMenuItem
                    onClick={() => setGenre('')}
                    className="text-white cursor-pointer hover:bg-gray-700"
                  >
                    Hammasi
                  </DropdownMenuItem>
                  {genres.map((g) => (
                    <DropdownMenuItem
                      key={g}
                      onClick={() => setGenre(g)}
                      className="text-white hover:bg-gray-700 cursor-pointer"
                    >
                      {g}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-10">
                  <Button
                    variant="outline"
                    className="bg-[#161616] cursor-pointer border-gray-700 text-white"
                  >
                    Yil: {year || 'Hammasi'} <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#161616] border-gray-700 max-h-60 overflow-y-auto">
                  <DropdownMenuItem
                    onClick={() => setYear('')}
                    className="text-white cursor-pointer hover:bg-gray-700"
                  >
                    Hammasi
                  </DropdownMenuItem>
                  {years.map((y) => (
                    <DropdownMenuItem
                      key={y}
                      onClick={() => setYear(y)}
                      className="text-white cursor-pointer hover:bg-gray-700"
                    >
                      {y}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-10">
                  <Button
                    variant="outline"
                    className="bg-[#161616] cursor-pointer border-gray-700 text-white"
                  >
                    Davlat: {country || 'Hammasi'} <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#161616] border-gray-700">
                  <DropdownMenuItem
                    onClick={() => setCountry('')}
                    className="text-white cursor-pointer hover:bg-gray-700"
                  >
                    Hammasi
                  </DropdownMenuItem>
                  {countries.map((c) => (
                    <DropdownMenuItem
                      key={c}
                      onClick={() => setCountry(c)}
                      className="text-white cursor-pointer hover:bg-gray-700"
                    >
                      {c}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-10">
                  <Button
                    variant="outline"
                    className="bg-[#161616] cursor-pointer border-gray-700 text-white"
                  >
                    Saralash: {sortOptions.find((s) => s.value === sort)?.label}{' '}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#161616] border-gray-700">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setSort(option.value)}
                      className="text-white cursor-pointer hover:bg-gray-700"
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild className="h-10 cursor-pointer">
                  <Button variant={'outline'}>
                    Reyting: {rating}
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {
                        [5,6,7,8,9,10].map(rating => (
                            <DropdownMenuItem className='flex items-center gap-2 cursor-pointer hover:bg-gray-700' onClick={() => setRating(rating)}>
                               <Star size={16}/>
                               <span>{rating}</span>
                            </DropdownMenuItem>
                        )) 
                    }
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Yuklanmoqda...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {mockMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} type="search" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
