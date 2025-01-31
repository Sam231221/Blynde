import { createSlice } from "@reduxjs/toolkit";

export const ProductDeleteSlice = createSlice({
  name: "productDelete",
  initialState: { loading: false, success: false, error: false, products: [] },
  reducers: {
    PRODUCT_DELETE_REQUEST: (state, action) => {
      return { loading: true, products: [] };
    },

    PRODUCT_DELETE_SUCCESS: (state, action) => {
      return { loading: false, success: true, products: action.payload };
    },

    PRODUCT_DELETE_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

export const {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} = ProductDeleteSlice.actions;

//enable us to import the slice as ProductReducer
export default ProductDeleteSlice.reducer;
