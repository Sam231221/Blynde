import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "../../lib/api";
import { Review } from "../../types";

// Define the state structure
interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
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
      .addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.push(action.payload);
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
