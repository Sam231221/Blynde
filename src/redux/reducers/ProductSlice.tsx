import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductState } from "../../types";
import apiClient from "../../lib/api";
import { toast } from "react-toastify";

const initialState: ProductState = {
  allProducts: [],
  topProducts: [],
  recentProducts: [],
  productDetail: null, // Add this field
  loading: false,
  error: null,
};

export const fetchProductDetail = createAsyncThunk(
  "product/fetchProductDetail",
  async (productId: number) => {
    try {
      const response = await apiClient.get(`/api/products/${productId}/`);
      return response.data as Product;
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching product details.");
      return Promise.reject("Failed to fetch product details");
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.productDetail = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
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
