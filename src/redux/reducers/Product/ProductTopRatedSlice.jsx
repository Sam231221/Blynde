import { createSlice } from "@reduxjs/toolkit";

export const ProductTopRatedSlice = createSlice({
  name: "productTopRated",
  initialState: { loading: false, error: false, products: [] },
  reducers: {
    //ACTION TYPE 1( Recall switch(action.type) from reducers)
    PRODUCT_TOP_RATED_REQUEST: (state, action) => {
      return { loading: true, products: [] };
    },

    //ACTION TYPE 2
    PRODUCT_TOP_RATED_SUCCESS: (state, action) => {
      return { loading: false, products: action.payload };
    },

    //ACTION TYPE 3
    PRODUCT_TOP_RATED_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

//ProductTopRatedSlice is a action that must be eported
export const {
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
} = ProductTopRatedSlice.actions;

//enable us to import the slice as ProductReducer
export default ProductTopRatedSlice.reducer;
