import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState, User } from "../../types";

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
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
