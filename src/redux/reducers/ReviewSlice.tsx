import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiRequest } from "../../lib/axiosClient";
import { Review } from "../../types";
import { toast } from "react-toastify";

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
export const fetchReviews = createAsyncThunk<
  Review[],
  void,
  { rejectValue: string }
>("reviews/fetchReviews", async (_, { rejectWithValue }) => {
  try {
    const response = await apiRequest({
      url: "/api/products/reviews",
      method: "GET",
      requiresToken: true,
    });
    return response as Review[];
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while fetching reviews.");
    return rejectWithValue("Error fetching reviews");
  }
});

// Async thunk to add a new review
export const addReview = createAsyncThunk<
  Review,
  Omit<Review, "createdAt">,
  { rejectValue: string }
>("reviews/addReview", async (review, { rejectWithValue }) => {
  try {
    const response = await apiRequest({
      url: "/api/products/reviews",
      method: "POST",
      data: review,
      requiresToken: true,
    });

    return response as Review;
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong while adding the review.");
    return rejectWithValue("Error adding review");
  }
});

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
        state.error = { message: action.payload as string };
      })
      .addCase(addReview.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // Optimistic update: Add the review immediately (assuming it will succeed)
        state.reviews.push({
          ...action.meta.arg,
          createdAt: new Date().toISOString(),
        });
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        // If the API call succeeds, the server's response might have a different ID or timestamp.
        // Find the optimistically added review and replace it with the server's version.
        const index = state.reviews.findIndex(
          (review) => review === action.meta.arg
        );
        if (index !== -1) {
          state.reviews[index] = action.payload;
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = { message: action.payload as string };
        // Revert the optimistic update: Remove the review from the state
        state.reviews = state.reviews.filter(
          (review) => review !== action.meta.arg
        );
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
