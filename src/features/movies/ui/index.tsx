'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import { ChevronDown, Search,  } from 'lucide-react';
import httpClient from '@/shared/config/api/httpClient';
import { ResWithPagination } from '@/shared/config/api/types';
import OMDBMovieCard from '@/widgets/movies/ui/omdb-movie-card';
import { movie_requests } from '@/shared/config/api/movie/movie.requests';
import { IMovie } from '@/features/create-analyses/ui';
import { useQuery } from '@tanstack/react-query';
import user_requests from '@/shared/config/api/user/user.requests';

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
  const [search, setSearch] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [filteredMovie, setFilteredMovie] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<"movie" | "series" | "episode" | "">("")

  const years = Array.from({ length: 30 }, (_, i) => (2024 - i).toString());

  const me = useQuery({
    queryKey: ['me'],
    queryFn: () => user_requests.getMe(),
  })

  console.log(me.data, "me")
  
  useEffect(() => {
    setLoading(true);
    movie_requests.filterMovie(search.toLowerCase(),year,type).then(res => {
      setFilteredMovie(res.Search);
    })
    setLoading(false);
  }, [search,year,type]);
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

            <div className="flex gap-2 flex-wrap">
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
                    Turi: {type || 'Hammasi'} <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#161616] border-gray-700 max-h-60 overflow-y-auto">
                  <DropdownMenuItem
                    onClick={() => setType('')}
                    className="text-white cursor-pointer hover:bg-gray-700"
                  >
                    Hammasi
                  </DropdownMenuItem>
                  {["movie", "series", "episode"].map((y) => (
                    <DropdownMenuItem
                      key={y}
                      onClick={() => setType(y as "movie" | "series" | "episode")}
                      className="text-white cursor-pointer hover:bg-gray-700"
                    >
                      {y}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-400">Yuklanmoqda...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {Array.isArray(filteredMovie) && me.data &&
                filteredMovie.map((movie, index) => <OMDBMovieCard movie={movie} key={index} me={me.data} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
