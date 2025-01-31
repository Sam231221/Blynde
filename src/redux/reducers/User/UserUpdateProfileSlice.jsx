import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const UserUpdateProfileSlice = createSlice({
  name: "UserUpdateProfile",
  initialState: {
    loading: false,
    error: false,
    success: false,
    userInfo: userInfoFromStorage,
  },
  reducers: {
    //ACTION TYPE 1
    USER_PROFILE_UPDATE_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    //ACTION TYPE 2
    USER_PROFILE_UPDATE_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    },

    //ACTION TYPE 3
    USER_PROFILE_UPDATE_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    //ACTION TYPE 4
    USER_PROFILE_UPDATE_RESET: (state, action) => {
      return {};
    },
  },
});

export const {
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
} = UserUpdateProfileSlice.actions;
export default UserUpdateProfileSlice.reducer;
