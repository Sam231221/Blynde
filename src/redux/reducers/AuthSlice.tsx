import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { AuthState } from "../../types/api/auth";
import { useAppSelector } from "../store";

const authFromStorage: AuthState = JSON.parse(
  localStorage.getItem("authState") ||
    '{"user":null,"accessToken":null,"refreshToken":null}'
);

const initialState: AuthState = authFromStorage;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: User | null;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      localStorage.removeItem("authState");
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },

    updateTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const useUser = () => {
  return useAppSelector((state) => state.auth.user);
};

export const { logout, setUser, updateTokens } = authSlice.actions;
export default authSlice.reducer;
