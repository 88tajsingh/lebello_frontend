import axios from 'axios';
import store from '@/store';
import router from '@/router';

const token= store.getters.token;
console.log(token)
 const baseURL = 'http://172.105.152.65/lebello_backend/api/v1'
 
 const instance = axios.create({
  baseURL: baseURL,
  // timeout: 10000, 
  headers: {
    Accept: "application/json",
    'Content-Type': 'multipart/form-data',
    Authorization: "Bearer " + token,
  },
});

instance.interceptors.request.use(
  (config) => {
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
    console.log("res time", error)
    if (error.response.status === 401){
      // logout();
      store.dispatch('logout');
      router.push('/login')
    }
    return Promise.reject(error);
  }
);

export default instance;
