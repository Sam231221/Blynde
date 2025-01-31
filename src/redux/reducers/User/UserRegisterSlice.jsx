import { createSlice } from "@reduxjs/toolkit";
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const UserRegisterSlice = createSlice({
  name: "UserRegister",
  initialState: {
    loading: false,
    error: false,
    userInfo: userInfoFromStorage,
  },
  reducers: {
    //ACTION TYPE 1
    USER_REGISTER_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    //ACTION TYPE 2
    USER_REGISTER_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    },

    //ACTION TYPE 3
    USER_REGISTER_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} = UserRegisterSlice.actions;
export default UserRegisterSlice.reducer;
