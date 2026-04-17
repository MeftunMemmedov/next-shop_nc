import axios from 'axios';
import { apikey, baseURL } from '..';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    apikey,
    Authorization: `Bearer ${apikey}`,
  },
});

export default axiosInstance;
