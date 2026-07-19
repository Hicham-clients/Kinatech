import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie"; 
export const urlApi =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "https://admin.kiantech.ma";
export const axiosInstance = axios.create({
  baseURL: urlApi,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const fetchCsrfToken = async () => {
  await axios.get(`${urlApi}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
};
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (config.method && ['post', 'put', 'delete'].includes(config.method.toLowerCase())) {
      let token = Cookies.get('XSRF-TOKEN');
      if (!token) {
        await fetchCsrfToken();
        token = Cookies.get('XSRF-TOKEN');
      }
      config.headers['X-XSRF-TOKEN'] = token || '';
    }
    return config;
  },
  (error) => Promise.reject(error)
);

