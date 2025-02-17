import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import store from "../redux/store";

export const endpoint: string = import.meta.env.VITE_APP_API as string;

// 1. Augment AxiosRequestConfig to include custom properties
declare module "axios" {
  interface AxiosRequestConfig {
    requiresToken?: boolean;
  }
}

type RequestBody = Record<string, any> | FormData;

const axiosClient: AxiosInstance = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Request interceptor with proper type handling
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Always initialize headers if undefined
    config.headers = config.headers || {};

    // Token handling
    if (config.requiresToken !== false) {
      const token = store.getState().auth.userInfo?.token;
      if (token) {
        console.log("fk u");
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // FormData handling
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);
interface ApiRequestOptions<T> {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: RequestBody;
  requiresToken?: boolean;
  // ... any other options you might need
}

// 3. Generic request maker with type safety
export const apiRequest = async <T>(
  options: ApiRequestOptions<T>
): Promise<T> => {
  const { url, method, data, requiresToken = true } = options;
  const respone = await axiosClient({
    method,
    url,
    data,
    requiresToken: method === "GET" ? requiresToken : true, // Enforce token for non-GET
  });
  return respone.data;
};

export default axiosClient;
