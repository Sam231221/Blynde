import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  registerUser,
  requestPasswordReset,
} from "../lib/django/authApi";
import { logout, setUser } from "../redux/reducers/AuthSlice";
import { User } from "../types";
import {
  LoginFormData,
  LogoutData,
  LogoutResponse,
  RegisterFormData,
  RegisterResponse,
  RequestPasswordResetFormData,
  RequestPasswordResetResponse,
} from "../types/api/auth";

import { toast } from "react-toastify";
import { ApiErrorResponse } from "../types/common/response";
import { RootState } from "../types/redux";

export const useLogin = (
  options?: UseMutationOptions<User, ApiErrorResponse, LoginFormData>
): UseMutationResult<User, ApiErrorResponse, LoginFormData> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<User, ApiErrorResponse, LoginFormData>({
    mutationFn: loginUser,
    onSuccess: (user) => {
      dispatch(setUser(user as User));
      queryClient.setQueryData(["user"], user);
    },
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<RegisterResponse, unknown, RegisterFormData>
): UseMutationResult<RegisterResponse, unknown, RegisterFormData> => {
  return useMutation({
    mutationFn: registerUser,
    ...options,
  });
};

export const useLogout = (
  options?: UseMutationOptions<LogoutResponse, unknown, LogoutData>
): UseMutationResult<LogoutResponse, unknown, LogoutData> => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation<LogoutResponse, unknown, LogoutData>({
    mutationFn: logoutUser,
    onSuccess: () => {
      dispatch(logout());
      queryClient.removeQueries({ queryKey: ["user"] });
      toast.success("Logged out successfully");
    },
    ...options,
  });
};

export const usePasswordReset = (
  options?: UseMutationOptions<
    RequestPasswordResetResponse,
    ApiErrorResponse,
    RequestPasswordResetFormData
  >
): UseMutationResult<
  RequestPasswordResetResponse,
  ApiErrorResponse,
  RequestPasswordResetFormData
> => {
  return useMutation({
    mutationFn: requestPasswordReset,
    ...options,
  });
};

export const useUser = () => {
  return useSelector((state: RootState) => state.auth.userInfo);
};
