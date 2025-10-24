import axios from 'axios';
import { DISCUSSED_MOVIES, OBDM_API_KEY, OBDM_BASE_URL } from '../URLs';
import { OMDBSearchResonse, SearchMovieResponse } from './movie.model';
import httpClient from '../httpClient';
import { IPost } from '../posts/posts.model';

const movie_requests = {
  searchForMovie: async (movieName: string): Promise<SearchMovieResponse> => {
    return (
      await axios.get(OBDM_BASE_URL + `?apikey=${OBDM_API_KEY}&s=${movieName}`)
    ).data;
  },
  getPopulerMovies: async():Promise<IPost[]> => {
    return (await httpClient(DISCUSSED_MOVIES)).data;
  },
  filterMovie: async(title: string, y?: string, type?: string):Promise<OMDBSearchResonse> => {
    return (await axios.get(OBDM_BASE_URL + `?apikey=${OBDM_API_KEY}&s=${title}&y=${y}&plot=full&type=${type}`)).data;
  },
  getMovieByid: async(id: string) => {
    return (await axios.get(OBDM_BASE_URL + `?apikey=${OBDM_API_KEY}&i=${id}`)).data;
  }
};

export { movie_requests };
