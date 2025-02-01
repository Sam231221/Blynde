import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../lib/api";
import { Review } from "../../types";

// Define the state structure
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

// Async thunk to fetch reviews for a product
// Fetch all reviews (since your API lists all reviews together)
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/api/products/reviews/");
      return response.data as Review[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error fetching reviews");
    }
  }
);

// Async thunk to add a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (review: Omit<Review, "createdAt">, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/api/products/reviews/", review);
      console.log(response.data);
      return response.data as Review;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Error adding review");
    }
  }
);
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.error = null; // Clear error when clearing reviews
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.loading = false;
          state.reviews = action.payload;
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addReview.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // Optimistic update: Add the review immediately (assuming it will succeed)
        state.reviews.push(action.meta.arg); // action.meta.arg contains the review data
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        // If the API call succeeds, the server's response might have a different ID or timestamp.
        // Find the optimistically added review and replace it with the server's version.
        const index = state.reviews.findIndex(
          (review) => review === action.meta.arg
        ); // Assuming object reference is maintained. If not, find using a unique identifier.
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Revert the optimistic update: Remove the review from the state
        state.reviews = state.reviews.filter(
          (review) => review !== action.meta.arg
        ); // Again, assuming same object reference. If not, filter using unique ID.
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
