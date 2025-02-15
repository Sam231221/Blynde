import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  categories: string[];
  price: [number, number];
  sizes: string[];
  color: string;
  ordering: string;
  page: number;
  products_limit: number;
}

const initialState: FilterState = {
  categories: [],
  price: [0, 600],
  sizes: [],
  color: "",
  ordering: "",
  page: 1,
  products_limit: 8,
};

const filterSlice = createSlice({
  name: "productfilters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      // Directly mutating the properties of the state
      //otherwise won't work
      state.categories = action.payload.categories;
      state.price = action.payload.price;
      state.sizes = action.payload.sizes;
      state.color = action.payload.color;
      state.ordering = action.payload.ordering;
      state.page = action.payload.page;
      state.products_limit = action.payload.products_limit;
    },
    setFilterCategories: (state, action: PayloadAction<string[]>) => {
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
  setFilters,
  setFilterCategories,
  setPrice,
  setFilterSizes,
  setColor,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
