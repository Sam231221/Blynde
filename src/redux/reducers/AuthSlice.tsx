import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { AuthState } from "../../types/api/auth";
import { RootState } from "../../types/redux";

const userInfoFromStorage: User | null = JSON.parse(
  localStorage.getItem("userInfo") || "null"
);

const initialState: AuthState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },

    updateTokens(
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>
    ) {
      if (state.userInfo) {
        state.userInfo.access_token = action.payload.access_token;
        state.userInfo.refresh_token = action.payload.refresh_token;
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
  },
});
export const selectUser = (state: RootState) => state.auth.userInfo;

export const { logout, setUser, updateTokens } = authSlice.actions;
export default authSlice.reducer;
