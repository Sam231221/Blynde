import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../types";

const initialState: ProductState = {
  allProducts: [],
  topProducts: [],
  recentProducts: [],
  productDetail: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload;
    },
    setTopProducts: (state, action: PayloadAction<Product[]>) => {
      state.topProducts = action.payload;
    },
    setRecentProducts: (state, action: PayloadAction<Product[]>) => {
      state.recentProducts = action.payload;
    },
    setProductDetail: (state, action: PayloadAction<Product | null>) => {
      state.productDetail = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setRecentProducts,
  setTopProducts,
  setProductDetail,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
