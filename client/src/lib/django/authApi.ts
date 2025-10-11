import { apiRequest } from "../axios/axiosClient";
import store from "../../redux/store";
import {
  LoginFormData,
  LogoutResponse,
  RegisterFormData,
  RegisterResponse,
  RequestPasswordResetFormData,
  RequestPasswordResetResponse,
} from "../../types/api/auth";
import { User } from "../../types";

const getRefreshToken = (): string | null => {
  return store.getState().auth.refreshToken;
};

export const loginUser = async (loginData: LoginFormData) => {
  const user = await apiRequest<User>({
    url: "/api/auth/login/",
    method: "POST",
    data: loginData,
    requiresToken: false,
  });
  return user as User;
};

export const registerUser = async (registerData: RegisterFormData) => {
  const response = await apiRequest<RegisterResponse>({
    url: "/api/auth/register/",
    method: "POST",
    data: registerData,
  });
  return response as RegisterResponse;
};

export const logoutUser = async () => {
  const refreshToken = getRefreshToken();
  const response = await apiRequest<LogoutResponse>({
    url: "/api/auth/logout/",
    method: "POST",
    data: {
      refresh: refreshToken,
    },
    requiresToken: true,
  });
  return response as LogoutResponse;
};

export const requestPasswordReset = async ({
  email,
}: RequestPasswordResetFormData) => {
  const response = await apiRequest<RequestPasswordResetResponse>({
    url: "/api/auth/password-reset-request/",
    method: "POST",
    data: { email },
    requiresToken: false,
  });
  return response as RequestPasswordResetResponse;
};
