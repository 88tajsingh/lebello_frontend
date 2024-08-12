import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { checkAndRefreshToken } from '@/helper/functions';
import LoginServices from './LoginServices';

const baseURL = import.meta.env.VITE_BASE_URL
const instance = axios.create({
  baseURL: baseURL,
  // timeout: 10000, 
  headers: {
    Accept: "application/json",
  },
  
});

instance.interceptors.request.use(
  async (config) => {
    let token = store.getters.token || localStorage.getItem('token');
    // if( token )
      // checkAndRefreshToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    // console.log("res time", response)
    const token = store.getters.token;
    // if( token )
   
    return response;
  },
  (error) => {
    // console.log("res time", error)
    if (error.response.status === 401){
      // logout();
      store.dispatch('logout');
      router.push('/login')
    }
    return error.response.data;
    // return Promise.reject(error);
  }
);

export default instance;
