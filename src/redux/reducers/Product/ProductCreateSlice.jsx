import { createSlice } from "@reduxjs/toolkit";

export const ProductCreateSlice = createSlice({
  name: "productCreate",
  initialState: { loading: false, error: false, product: {} },
  reducers: {
    //ACTION TYPE 1( Recall switch(action.type) from reducers)
    PRODUCT_CREATE_REQUEST: (state, action) => {
      return { ...state, loading: true };
    },

    //ACTION TYPE 2
    PRODUCT_CREATE_SUCCESS: (state, action) => {
      return {
        ...state,
        loading: false,
        success: true,
        product: action.payload,
      };
    },

    //ACTION TYPE 3
    PRODUCT_CREATE_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },

    //ACTION TYPE 4
    PRODUCT_CREATE_RESET: (state, action) => {
      return {};
    },
  },
});

//ProductCreateSlice is a action that must be eported
export const {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
} = ProductCreateSlice.actions;

//enable us to import the slice as ProductReducer
export default ProductCreateSlice.reducer;
