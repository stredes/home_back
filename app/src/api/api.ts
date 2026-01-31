import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
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
    const config = error.config as AxiosRequestConfig;
    if (error.response?.status === 401 && !config?.__isRetry && !config?.skipAuthRefresh) {
      config.__isRetry = true;
      try {
        const refresh = await api.post('/auth/refresh', {}, { skipAuthRefresh: true });
        setAccessToken(refresh.data.accessToken);
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${refresh.data.accessToken}`;
        return api.request(config);
      } catch {
        setAccessToken(null);
      }
    }
    return Promise.reject(error);
  },
);

export async function refreshAccessToken() {
  const refresh = await api.post('/auth/refresh', {}, { skipAuthRefresh: true });
  const token = refresh.data?.accessToken;
  if (token) setAccessToken(token);
  return token as string | undefined;
}
