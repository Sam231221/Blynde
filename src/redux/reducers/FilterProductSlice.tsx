import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  categories: string[];
  price: [number, number];
  sizes: string[];
  color: string;
}

const initialState: FilterState = {
  categories: [],
  price: [0, 600],
  sizes: [],
  color: "",
};

const filterSlice = createSlice({
  name: "productfilters",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
    },
    setPrice: (state, action: PayloadAction<[number, number]>) => {
      state.price = action.payload;
    },
    setFilterSizes: (state, action: PayloadAction<string[]>) => {
      state.sizes = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    // You can add a reset filter action here if needed
    resetFilters: () => {
      return initialState; // Resets to initial state
    },
  },
});

export const {
  setCategories,
  setPrice,
  setFilterSizes,
  setColor,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
