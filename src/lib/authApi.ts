import { User } from "../types";
import { apiRequest } from "./api";

// Login User
export const loginUser = (userData: {
  email: string;
  password: string;
  rememberMe: boolean;
}): Promise<User> => {
  return apiRequest("/api/users/login/", "POST", userData);
};

// Register User
export const registerUser = (userData: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}): Promise<User> => {
  return apiRequest("/api/users/register/", "POST", userData);
};

export const resetPasswordForUser = (email: string): Promise<void> => {
  return apiRequest("/api/users/password-reset/", "POST", { email });
};

export const logoutUser = () => {
  localStorage.removeItem("userInfo");
};
