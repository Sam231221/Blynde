import { createSlice } from "@reduxjs/toolkit";
const userLikesFromStorage = localStorage.getItem("userLikes")
  ? JSON.parse(localStorage.getItem("userLikes"))
  : [];
export const UserLikeSlice = createSlice({
  name: "wishlist",
  initialState: {
    loading: false,
    error: false,
    userLikes: userLikesFromStorage,
  },
  reducers: {
    USER_LIKE_ADD: (state, action) => {
      const item = action.payload;
      const existItem = state.userLikes.find(
        (userLike) => userLike._id === item._id
      );
      if (existItem) {
        return {
          ...state,
          userLikes: state.userLikes.map((userLike) =>
            userLike._id === existItem._id ? item : userLike
          ),
        };
      } else {
        return { ...state, userLikes: [...state.userLikes, item] };
      }
    },
    USER_LIKE_REMOVE: (state, action) => {
      return {
        ...state,
        userLikes: state.userLikes.filter((x) => x._id !== action.payload),
      };
    },
    USER_LIKE_ERROR: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});

export const { USER_LIKE_ADD, USER_LIKE_REMOVE, USER_LIKE_ERROR } =
  UserLikeSlice.actions;
export default UserLikeSlice.reducer;
