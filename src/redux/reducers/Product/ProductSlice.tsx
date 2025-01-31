import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../../types";
const initialState: ProductState = {
  allProducts: [],
  topProducts: [],
  recentProducts: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, allProducts: action.payload };
    },
    setTopProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, topProducts: action.payload };
    },
    setRecentProducts: (state, action: PayloadAction<Product[]>) => {
      return { ...state, recentProducts: action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const {
  setAllProducts,
  setRecentProducts,
  setTopProducts,
  setLoading,
  setError,
} = productSlice.actions;

export default productSlice.reducer;
