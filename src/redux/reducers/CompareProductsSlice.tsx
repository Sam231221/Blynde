import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { CompareState, useAppSelector } from "../../types/redux";

const loadState = (): CompareState => {
  try {
    const savedProducts = localStorage.getItem("compareProducts");
    if (savedProducts) {
      return {
        products: JSON.parse(savedProducts).slice(0, 3),
      };
    }
  } catch (err) {
    console.error("Error loading compare state from localStorage", err);
  }

  return {
    products: [],
  };
};

const CompareProductsSlice = createSlice({
  name: "comparelist",
  initialState: loadState(),
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      if (!state.products.some((p) => p._id === action.payload._id)) {
        state.products.push(action.payload);
        localStorage.setItem("compareProducts", JSON.stringify(state.products));
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );

      localStorage.setItem("compareProducts", JSON.stringify(state.products));
    },
    clearCompare: (state) => {
      state.products = [];
      localStorage.removeItem("compareProducts");
    },
  },
});

export const { addProduct, removeProduct, clearCompare } =
  CompareProductsSlice.actions;

export const useCompareProducts = () => {
  return useAppSelector((state) => state.comparelist);
};
export default CompareProductsSlice.reducer;
