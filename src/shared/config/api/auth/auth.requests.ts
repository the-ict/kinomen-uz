import httpClient from '../httpClient';
import {
  LoginBodyModel,
  LoginResponseModel,
  RegisterBodyModel,
  RegisterResponseModel,
} from './auth.model';

const auth_requests = {
  login: async (body: LoginBodyModel): Promise<LoginResponseModel> => {
    return (await httpClient.post('/auth/login', body)).data;
  },
  register: async (body: RegisterBodyModel): Promise<RegisterResponseModel> => {
    return (await httpClient.post('/auth/register', body)).data;
  },
};

export default auth_requests;
