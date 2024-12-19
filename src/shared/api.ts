//import { ACCESS_TOKEN_KEY } from '@/constants/endpoints'
import axios, { AxiosInstance } from 'axios'

export const API_BASE_URL = 'http://localhost:8080'

//const token = localStorage.getItem(ACCESS_TOKEN_KEY);

const createAxiosInstance = (baseUrl: string = API_BASE_URL): AxiosInstance => {
    return axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

const apiInstance = createAxiosInstance()

export default apiInstance
