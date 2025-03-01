import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import store from "../../redux/store";
import { logout, updateTokens } from "../../redux/reducers/AuthSlice";
import { toast } from "react-toastify";

export const endpoint: string = import.meta.env.VITE_APP_API as string;

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
    config.headers = config.headers || {};
    const token = store.getState().auth.userInfo?.access_token;

    if (config.requiresToken !== false && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().auth.userInfo?.refresh_token;
        if (!refreshToken) {
          store.dispatch(logout());
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${endpoint}/api/token/refresh/`, {
          refresh: refreshToken,
        });

        store.dispatch(
          updateTokens({
            access_token: data.access,
            refresh_token: data.refresh,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${data.access}`;

        return axiosClient(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

interface ApiRequestOptions {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: RequestBody;
  requiresToken?: boolean;
}

export const apiRequest = async <T>(options: ApiRequestOptions): Promise<T> => {
  const { url, method, data, requiresToken = true } = options;

  try {
    const response: AxiosResponse<T> = await axiosClient({
      method,
      url,
      data,
      requiresToken: method === "GET" ? requiresToken : true,
    });

    if (response.status === 204) {
      return response.data;
    } else if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errData = error.response?.data;

      // (V.Imp)Return the error data so that your onError callback can process field-level errors.
      return Promise.reject(errData);
    } else {
      return Promise.reject({
        errors: { general: "An unexpected error occurred" },
      });
    }
  }
};

export default axiosClient;
