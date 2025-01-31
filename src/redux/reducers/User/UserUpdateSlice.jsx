import { createSlice } from "@reduxjs/toolkit";

export const UserUpdateSlice = createSlice({
  name: "UserUpdate",
  initialState: {
    loading: false,
    error: false,
    user: {},
  },
  reducers: {
    //ACTION TYPE 1
    USER_UPDATE_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    //ACTION TYPE 2
    USER_UPDATE_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    },

    //ACTION TYPE 3
    USER_UPDATE_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    //ACTION TYPE 4
    USER_UPDATE_RESET: (state, action) => {
      return {
        ...state,
        user: {},
      };
    },
  },
});

export const {
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} = UserUpdateSlice.actions;
export default UserUpdateSlice.reducer;
