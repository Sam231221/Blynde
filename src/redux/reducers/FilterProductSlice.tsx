import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "../../types/redux";

export const initialState: FilterState = {
  categories: [],
  price: [0, 600],
  sizes: [],
  color: "",
  page: 1,
  productsDisplayType: "grid",
  products_limit: 8,
  ordering: "",
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
    setProductsDisplayType: (state, action: PayloadAction<"grid" | "list">) => {
      state.productsDisplayType = action.payload;
    },
    setOrdering: (state, action: PayloadAction<string>) => {
      state.ordering = action.payload;
    },

    resetFilters: () => {
      return initialState;
    },
  },
});

export const {
  setFilters,
  setFilterCategories,
  setPrice,
  setFilterSizes,
  setColor,
  setProductsDisplayType,
  setOrdering,
  resetFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
