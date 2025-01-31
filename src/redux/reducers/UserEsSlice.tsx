import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define TypeScript Interfaces
interface User {
  refresh: string;
  access: string;
  id: number;
  _id: number;
  username: string;
  firstName: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
}

interface UserLike {
  _id: string;
  name: string;
  image: string;
  price: number;
}

interface UserState {
  loading: boolean;
  error: string | null;
  user: User | null;
  userLikes: UserLike[];
  deleteSuccess: boolean;
}

// ✅ Get user likes from localStorage
const userLikesFromStorage: UserLike[] = JSON.parse(
  localStorage.getItem("userLikes") || "[]"
);

// ✅ Define Initial State
const initialState: UserState = {
  loading: false,
  error: null,
  user: null,
  userLikes: userLikesFromStorage,
  deleteSuccess: false,
};

// ✅ Create Redux Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 📌 User Like Actions (Wishlist)
    addUserLike: (state, action: PayloadAction<UserLike>) => {
      const item = action.payload;
      const existItem = state.userLikes.find((like) => like._id === item._id);
      if (!existItem) {
        state.userLikes.push(item);
        localStorage.setItem("userLikes", JSON.stringify(state.userLikes));
      }
    },
    removeUserLike: (state, action: PayloadAction<string>) => {
      state.userLikes = state.userLikes.filter(
        (like) => like._id !== action.payload
      );
      localStorage.setItem("userLikes", JSON.stringify(state.userLikes));
    },
    setUserLikeError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // 📌 User Detail Actions
    setUserDetailSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
    },
    setUserDetailFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetUserDetail: (state) => {
      state.user = null;
      state.error = null;
    },

    // 📌 User Delete Actions
    userDeleteRequest: (state) => {
      state.loading = true;
      state.deleteSuccess = false;
    },
    userDeleteSuccess: (state) => {
      state.loading = false;
      state.deleteSuccess = true;
      state.user = null;
      state.userLikes = [];
      localStorage.removeItem("userLikes");
    },
    userDeleteFail: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// ✅ Export Actions & Reducer
export const {
  addUserLike,
  removeUserLike,
  setUserLikeError,
  setUserDetailSuccess,
  setUserDetailFail,
  resetUserDetail,
  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,
} = userSlice.actions;

export default userSlice.reducer;
