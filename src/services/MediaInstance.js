import axios from 'axios';
import store from '@/store';
import router from '@/router';

const baseURL = import.meta.env.VITE_BASE_URL
const instance = axios.create({
  baseURL: baseURL,
  // timeout: 10000, 
  headers: {
    Accept: "application/json",
    'Content-Type': 'multipart/form-data',
  },
  
});

instance.interceptors.request.use(
  (config) => {
    const token = store.getters.token || localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    
    // console.log("request time", config)
    return config;
  },
  (error) => {
    // console.log("request time", error)

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log("res time", response)
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
