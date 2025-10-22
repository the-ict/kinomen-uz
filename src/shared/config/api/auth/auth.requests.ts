import httpClient from '../httpClient';
import { LOGIN, REGISTER } from '../URLs';
import {
  LoginBodyModel,
  LoginResponseModel,
  RegisterBodyModel,
  RegisterResponseModel,
} from './auth.model';

const auth_requests = {
  login: async (body: LoginBodyModel): Promise<LoginResponseModel> => {
    return (await httpClient.post(LOGIN, body)).data;
  },
  register: async (body: RegisterBodyModel): Promise<RegisterResponseModel> => {
    return (await httpClient.post(REGISTER, body)).data;
  },
};

export default auth_requests;
