import axios from 'axios';
import { OBDM_API_KEY, OBDM_BASE_URL } from '../URLs';
import { SearchMovieResponse } from './movie.model';

const movie_requests = {
  searchForMovie: async (movieName: string): Promise<SearchMovieResponse> => {
    return (
      await axios.get(OBDM_BASE_URL + `?apikey=${OBDM_API_KEY}&s=${movieName}`)
    ).data;
  },
};

export { movie_requests };
