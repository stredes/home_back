import axios from 'axios';
import { getAccessToken, setAccessToken } from './token';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config.__isRetry) {
      error.config.__isRetry = true;
      const refresh = await api.post('/auth/refresh', {});
      setAccessToken(refresh.data.accessToken);
      error.config.headers.Authorization = `Bearer ${refresh.data.accessToken}`;
      return api.request(error.config);
    }
    return Promise.reject(error);
  },
);
