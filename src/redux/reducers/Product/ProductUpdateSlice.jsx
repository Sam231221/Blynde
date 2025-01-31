import { createSlice } from "@reduxjs/toolkit";

export const ProductUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {loading: false, error:false, success:false,product:{}},
  reducers: {

    PRODUCT_UPDATE_REQUEST: (state, action) => {
      return {
        ...state, loading: true}
    },

    PRODUCT_UPDATE_SUCCESS: (state, action) => {
      return {...state,loading: false, success:true, product: action.payload}
    },

    PRODUCT_UPDATE_FAIL: (state, action) => {
      return {...state, loading: false, error:action.payload}
    },

    PRODUCT_UPDATE_RESET: (state, action) => {
        return {...state}
      },

  },
});

export const { PRODUCT_UPDATE_REQUEST,PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL } = ProductUpdateSlice.actions;
export default ProductUpdateSlice.reducer;

