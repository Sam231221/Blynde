import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "../redux/store";

export const endpoint: string = import.meta.env.VITE_APP_API as string;

const apiClient: AxiosInstance = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional: Add an interceptor for response error handling or logging.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Customize error handling here if needed.
    return Promise.reject(error);
  }
);

export type { AxiosRequestConfig };

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiRequestOptions {
  /**
   * When true, the Authorization header will not be attached,
   * even if a token exists. This is useful for endpoints that do not require auth.
   */
  skipAuth?: boolean;
}

/**
 * Makes an API request using axios.
 *
 * @param url - The endpoint URL (relative to the base URL).
 * @param method - The HTTP method to use.
 * @param body - The request payload. (Ignored for GET requests)
 * @param options - Optional settings (like skipAuth).
 * @returns The response data typed as T.
 */
export const apiRequest = async <T>(
  url: string,
  method: HTTPMethod = "GET",
  body?: unknown,
  options?: ApiRequestOptions
): Promise<T> => {
  const token = store.getState().auth.userInfo?.token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Attach the token only if:
  // - a token exists,
  // - the method is not GET (GET endpoints might not expect auth headers),
  // - and skipAuth was not set to true.
  if (token && method !== "GET" && !options?.skipAuth) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
  };

  // Only include the request body if the method supports it
  if (body && method !== "GET") {
    config.data = body;
  }

  const response = await apiClient.request<T>(config);
  return response.data;
};

export default apiClient;
