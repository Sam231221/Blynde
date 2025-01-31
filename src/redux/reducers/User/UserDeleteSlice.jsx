import { createSlice } from "@reduxjs/toolkit";

export const UserDeleteSlice = createSlice({
  name: "UserDelete",
  initialState: {
    loading: false,
    error: false,
  },
  reducers: {
    //ACTION TYPE 1
    USER_DELETE_REQUEST: (state, action) => {
      return state;
    },

    //ACTION TYPE 2
    USER_DELETE_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        success: true,
      };
    },

    //ACTION TYPE 3
    USER_DELETE_FAIL: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } =
  UserDeleteSlice.actions;
export default UserDeleteSlice.reducer;
