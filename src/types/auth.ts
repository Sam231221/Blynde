import { User } from ".";
import { ApiErrorResponse } from "./api/responses";
import { ErrorResponse } from "react-router-dom";
export interface LoginFormData extends Record<string, unknown> {
  email: string;
  password: string;
  rememberMe?: boolean;
}
export type LoginResponse = User | ErrorResponse;

export interface RegisterFormData extends Record<string, unknown> {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
export type RegisterResponse = User | ErrorResponse;

export interface LogoutData {
  refresh: string;
}

export interface LogoutResponse {
  error?: string;
}

export type RequestPasswordResetResponse =
  | RequestPasswordResetSuccessResponse
  | ApiErrorResponse;

export interface RequestPasswordResetSuccessResponse {
  detail: string;
}
export interface RequestPasswordResetFormData {
  email: string;
}
