import axios from 'axios';
import Config from 'react-native-config';
import { EventRegister } from 'react-native-event-listeners';

const BASE_URL = Config.API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const setAuthToken = (token?: string) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

apiClient.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response?.status;
    if (error.code === 'ECONNABORTED') {
      console.log('⏰ Request timed out:', error.config?.url);
    } else if (status === 401) {
      console.log('🔐 Unauthorized! Invalid token.');
      EventRegister.emit('FORCE_LOGOUT');
    } else if (error.response) {
      console.log(
        `❌ API Error [${error.response.status}]:`,
        error.response.data,
      );
    } else {
      console.log("err===", error);
      console.log('⚠️ Unknown API Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
