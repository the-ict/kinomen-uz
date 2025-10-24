import httpClient from '../httpClient';
import {
  CHECK_USERNAME,
  FOLLOW_USER,
  GET_PROFILE,
  ME,
  WATCHLIST,
} from '../URLs';
import type { ProfileBodyModel, UserBodyModels } from './user.models';

const user_requests = {
  checkUsername: async (username: string) => {
    return (await httpClient.get(`${CHECK_USERNAME}/${username}`)).data;
  },
  getProfile: async (id: number): Promise<UserBodyModels> => {
    return (await httpClient.get(GET_PROFILE + id)).data;
  },
  updateProfile: async (
    id: number,
    body: any,
  ): Promise<UserBodyModels> => {
    return (await httpClient.put(GET_PROFILE + id, body)).data;
  },
  deleteProfile: async (id: number) => {
    return (await httpClient.delete(GET_PROFILE + id)).data;
  },
  followUser: async (id: number) => {
    return (await httpClient.post(FOLLOW_USER + id)).data;
  },
  watchlist: async (postId: number) => {
    return (await httpClient.post(WATCHLIST + postId)).data;
  },
  getMe: async (): Promise<UserBodyModels> => {
    return (await httpClient.get(ME)).data;
  },
  getFollowings: async (id:number): Promise<ProfileBodyModel> => {
    console.log(id, "id")
    return (await httpClient.get(GET_PROFILE + id + '/follows')).data;
  },
};

export default user_requests;
