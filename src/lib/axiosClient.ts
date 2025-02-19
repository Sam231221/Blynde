import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import store from "../redux/store";

export const endpoint: string = import.meta.env.VITE_APP_API as string;

// 1. Augment AxiosRequestConfig to include custom properties
declare module "axios" {
  interface AxiosRequestConfig {
    requiresToken?: boolean;
  }
}

export type RequestBody = Record<string, unknown> | FormData;

const axiosClient: AxiosInstance = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Always initialize headers if undefined
    config.headers = config.headers || {};

    // Token handling
    if (config.requiresToken !== false) {
      const token = store.getState().auth.userInfo?.access_token;
      if (token) {
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
interface ApiRequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: RequestBody;
  requiresToken?: boolean;
  // ... any other options you might need
}

// 3. Generic request maker with type safety
export const apiRequest = async <T>(
  options: ApiRequestOptions
): Promise<T | number> => {
  const { url, method, data, requiresToken = true } = options;

  try {
    const response: AxiosResponse<T> = await axiosClient({
      // Type the response
      method,
      url,
      data,
      requiresToken: method === "GET" ? requiresToken : true,
    });

    if (response.status === 204) {
      return response.status;
    } else if (response.status >= 200 && response.status < 300) {
      return response.data; // Return response.data for other successful requests
    } else {
      throw new Error(`HTTP error! status: ${response.status}`); // Throw an error for non-2xx status codes
    }
  } catch (error) {
    console.error("apiRequest error:", error);

    throw error;
  }
  // Promise<T> -> Promise<T | number> for 204 status response
  // This line is unreachable, but added to satisfy TypeScript's control flow analysis.
  throw new Error("Unhandled code path in apiRequest");
};

export default axiosClient;

//how to properly handle response of 204 status code response
