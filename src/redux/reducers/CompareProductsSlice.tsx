import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

interface CompareState {
  products: Product[];
}

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

// Create the slice
const CompareProductsSlice = createSlice({
  name: "comparelist",
  initialState: loadState(),
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // Only add if not already in the list
      if (!state.products.some((p) => p._id === action.payload._id)) {
        state.products.push(action.payload);
        // Save to localStorage
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
export default CompareProductsSlice.reducer;
