import getLocaleCS from '@/shared/lib/getLocaleCS';
import axios from 'axios';
import { getLocale } from 'next-intl/server';
import { LanguageRoutes } from '../i18n/types';
import { BASE_URL } from './URLs';
import { useStore } from '@/shared/store';

const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

httpClient.interceptors.request.use(
  async (config) => {
    const token = useStore.getState().token;

    let language = LanguageRoutes.UZ;
    try {
      language = (await getLocale()) as LanguageRoutes;
    } catch (e) {
      console.log('error', e);
      language = getLocaleCS() || LanguageRoutes.UZ;
    }

    config.headers['Accept-Language'] = language;
    if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  },
);

export default httpClient;
