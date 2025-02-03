import store from "../redux/store";
import { User } from "../types";
import apiClient, { AxiosRequestConfig } from "./api";

// Generic API Request Function

const apiRequest = async (
  url: string,
  method: string = "GET",
  body: any = null
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
// Login User
export const loginUser = (userData: {
  username: string;
  password: string;
}): Promise<User> => {
  return apiRequest("/api/users/login/", "POST", userData);
};

// Register User
export const registerUser = (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  return apiRequest("/api/users/register/", "POST", userData);
};

export const logoutUser = () => {
  localStorage.removeItem("userInfo");
};
