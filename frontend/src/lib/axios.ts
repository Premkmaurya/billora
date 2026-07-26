import axios from 'axios';
import { CONFIG } from '../constants/config';
import { handleApiError } from '../utils/errorHandler';

export const apiClient = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 401 Handled globally by Redux / RTK Query base query listener
    } else {
      handleApiError(error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
