import axios from 'axios';
import { BASE_URL } from './URLs';
import { store } from '@/shared/store';

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = store.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      store.getState().setToken('');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default httpClient;
