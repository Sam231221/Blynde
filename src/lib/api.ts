import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "../redux/store";
// Define the endpoint as a constant with the proper type
export const endpoint: string = import.meta.env.VITE_APP_API as string;

// Create and export an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: endpoint,
  headers: {
    "Content-Type": "application/json", // Set default content type
    Accept: "application/json", // Accept JSON responses by default
  },
});
export type { AxiosRequestConfig };

export const apiRequest = async (
  url: string,
  method: string = "GET",
  body: unknown = null
) => {
  const token = store.getState().auth.userInfo?.token; // Get token from Redux store

  const headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    headers: headers,
  };

  if (body) {
    config.data = body; // Use 'data' for the request body in axios
  }
  const response = await apiClient(config);

  return response.data;
};
export default apiClient;
