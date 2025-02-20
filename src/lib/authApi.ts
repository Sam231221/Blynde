import { apiRequest } from "./axiosClient";
import store from "../redux/store";

// Function to get the latest refresh token from the store
const getRefreshToken = (): string | undefined => {
  return store.getState().auth.userInfo?.refresh_token;
};

// Login User
export const loginUser = (userData: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => {
  return apiRequest({
    url: "/api/users/login/",
    method: "POST",
    data: userData,
  });
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
}) => {
  return apiRequest({
    url: "/api/users/register/",
    method: "POST",
    data: userData,
  });
};

export const logoutUser = async () => {
  const refreshToken = getRefreshToken();
  const response = await apiRequest({
    url: "/api/users/logout/",
    method: "POST",
    data: {
      refresh: refreshToken,
    },
  });
  return response;
};

export const resetPasswordForUser = async (email: string) => {
  const response = await apiRequest({
    url: "/api/users/password-reset-request/",
    method: "POST",
    data: { email },
  });
  return response;
};
