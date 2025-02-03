import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

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
export default apiClient;
