import httpClient from '../httpClient';
import { MY_POSTS, POSTS, SEARCH_MOVIE } from '../URLs';
import { IPost, PostBodyModel } from './posts.model';

const post_requests = {
  getAll: async (): Promise<IPost[]> => {
    return (await httpClient.get(POSTS)).data;
  },
  getSinglePost: async (id: number): Promise<IPost> => {
    return (await httpClient.get(POSTS + id)).data;
  },
  createPost: async (body: PostBodyModel) => {
    return (await httpClient.post(POSTS, body)).data;
  },
  updatePost: async (id: number, body: PostBodyModel) => {
    return (await httpClient.put(POSTS + id, body)).data;
  },
  deletePost: async (id: number) => {
    return (await httpClient.delete(POSTS + id)).data;
  },
  likePost: async (id: number) => {
    return (await httpClient.post(POSTS + id + '/like')).data;
  },
  getMyPosts: async (): Promise<IPost[]> => {
    return (await httpClient.get(MY_POSTS)).data;
  },
  searchMovie: async (movieName: string) => {
    return (await httpClient.post(SEARCH_MOVIE, { movieName })).data;
  },
};

export default post_requests;
