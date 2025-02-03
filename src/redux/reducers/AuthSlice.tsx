import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { AuthState, User } from "../../types";

// Retrieve user info from localStorage or initialize it to null
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
      state.loading = false;
      state.error = null;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
