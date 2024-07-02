import axios from 'axios';
import ApiConfig from '@/config/apiConfig'; 
const baseURL = 'http://172.105.152.65/lebello_backend/api/v1'
const instance = axios.create({
  baseURL: baseURL,
  // timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default instance;
