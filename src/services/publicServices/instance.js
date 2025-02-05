import axios from 'axios';
let baseURL

async function setBaseURL() {
  if (typeof process !== 'undefined' && process.env) {
    const dotenv = await import('dotenv')
    dotenv.config()
    baseURL = process.env.VITE_BASE_URL
  } else {
    baseURL = import.meta.env.VITE_BASE_URL
  }
}

await setBaseURL()

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
