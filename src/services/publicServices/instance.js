import axios from 'axios';
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    // console.log("res time", response)
    // if( token )
   
    return response;
  },
  (error) => {
    // console.log("res time", error)
    return error.response;
    // return Promise.reject(error);
  }
);

export default instance;
