import { createSlice } from "@reduxjs/toolkit";

export const ProductListSlice = createSlice({
  name: "productList",
  initialState: { loading: false, error: false, products: [] },
  reducers: {
    //ACTION TYPE 1
    PRODUCT_LIST_REQUEST: (state, action) => {
      return { loading: true, products: [] };
    },

    //ACTION TYPE 2
    PRODUCT_LIST_SUCCESS: (state, action) => {
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    },

    //ACTION TYPE 3
    PRODUCT_LIST_FAIL: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

//ProductListSlice is a action that must be eported
export const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } =
  ProductListSlice.actions;

//enable us to import the slice as ProductReducer
export default ProductListSlice.reducer;
