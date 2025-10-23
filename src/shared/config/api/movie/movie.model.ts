import { IMovie } from '@/features/create-analyses/ui';

interface SearchMovieResponse {
  Response: string;
  Search?: IMovie[];
  total?: string;
  Error?: string;
}

interface OMDBSearchResonse {
  Response: string;
  Search: IMovie[],
  totalResults: string;
  Error?: string;
}

export type { SearchMovieResponse,OMDBSearchResonse };
