import { createSlice } from "@reduxjs/toolkit";
import { Review } from "../../types";

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: { message: string; code?: number } | null;
  showReviewForm: boolean;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: { message: "" },
  showReviewForm: false,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.error = null;
    },
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
