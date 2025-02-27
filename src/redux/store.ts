import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../types";

import AuthReducer from "./reducers/AuthSlice";

import ProductReducer from "./reducers/ProductSlice";
import CartReducer from "./reducers/CartSlice";
import WishListReducer from "./reducers/WishListSlice";

import ReviewReducer from "./reducers/ReviewSlice";
import OrderReducer from "./reducers/OrderSlice";
import FilterProductReducer from "./reducers/FilterProductSlice";
import CompareProductsReducer from "./reducers/CompareProductsSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    product: ProductReducer,
    comparelist: CompareProductsReducer,
    productfilters: FilterProductReducer,
    cart: CartReducer,
    wishlist: WishListReducer,
    reviews: ReviewReducer,
    orders: OrderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for non-serializable data like functions (e.g., Thunks)
    }),
});

export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
