import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "../../types";

const userInfoFromStorage: User | null = JSON.parse(
  localStorage.getItem("userInfo") || "null"
);

const initialState: AuthState = {
  loading: false,
  error: null,
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
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
