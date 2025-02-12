import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../types";

import AuthReducer from "./reducers/AuthSlice";
import UserReducer from "./reducers/UserSlice";
import ProductReducer from "./reducers/ProductSlice";
import CartReducer from "./reducers/CartSlice";
import ReviewReducer from "./reducers/ReviewSlice";
import OrderReducer from "./reducers/OrderSlice";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: UserReducer,
    product: ProductReducer,
    cart: CartReducer,
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
