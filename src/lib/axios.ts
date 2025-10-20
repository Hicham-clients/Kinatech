import axios from "axios";
import { AxiosCacheInstance, buildMemoryStorage, setupCache } from "axios-cache-interceptor";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// تطبيق الكاش على instance
const cachedAxios = setupCache(axiosInstance, {
  ttl: 1000 * 60 * 5, 
  storage: buildMemoryStorage(), 
});

export default cachedAxios as AxiosCacheInstance;
