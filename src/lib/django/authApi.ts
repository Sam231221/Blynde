import { apiRequest } from "../axios/axiosClient";
import store from "../../redux/store";
import {
  LoginFormData,
  LogoutResponse,
  RegisterFormData,
  RegisterResponse,
  RequestPasswordResetFormData,
  RequestPasswordResetResponse,
} from "../../types/auth";
import { User } from "../../types";

const getRefreshToken = (): string | undefined => {
  return store.getState().auth.userInfo?.refresh_token;
};

export const loginUser = async (loginData: LoginFormData) => {
  const user = await apiRequest<User>({
    url: "/api/users/login/",
    method: "POST",
    data: loginData,
  });
  return user as User;
};

export const registerUser = async (registerData: RegisterFormData) => {
  const response = await apiRequest<RegisterResponse>({
    url: "/api/users/register/",
    method: "POST",
    data: registerData,
  });
  return response as RegisterResponse;
};

export const logoutUser = async () => {
  const refreshToken = getRefreshToken();
  const response = await apiRequest<LogoutResponse>({
    url: "/api/users/logout/",
    method: "POST",
    data: {
      refresh: refreshToken,
    },
  });
  return response as LogoutResponse;
};

export const requestPasswordReset = async ({
  email,
}: RequestPasswordResetFormData) => {
  const response = await apiRequest<RequestPasswordResetResponse>({
    url: "/api/users/password-reset-request/",
    method: "POST",
    data: { email },
    requiresToken: false,
  });
  return response as RequestPasswordResetResponse;
};
