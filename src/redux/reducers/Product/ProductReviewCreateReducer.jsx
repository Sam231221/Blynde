import { createSlice } from "@reduxjs/toolkit";

export const ProductCreateReviewSlice = createSlice({
  name: "productCreateReview",
  initialState: {loading: false, error:false},
  reducers: {

    PRODUCT_CREATE_REVIEW_REQUEST: (state, action) => {
      return {
        ...state, loading: true}
    },

    PRODUCT_CREATE_REVIEW_SUCCESS: (state, action) => {
      return {loading: false, success:true}
    },

    PRODUCT_CREATE_REVIEW_FAIL: (state, action) => {
      return {loading: false, error:action.payload}
    },

  },
});

export const { PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL } = ProductCreateReviewSlice.actions;
export default ProductCreateReviewSlice.reducer;

