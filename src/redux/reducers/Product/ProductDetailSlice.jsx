import { createSlice } from "@reduxjs/toolkit";

export const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState: { loading: false, error: false, product: { reviews: [] } },
  reducers: {
    //ACTION TYPE 1
    PRODUCT_DETAIL_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    //ACTION TYPE 2
    PRODUCT_DETAIL_SUCCESS: (state, action) => {
      return { ...state, loading: false, product: action.payload };
    },

    //ACTION TYPE 3
    PRODUCT_DETAIL_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export const {
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} = ProductDetailSlice.actions;
export default ProductDetailSlice.reducer;
