import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AuthReducer from "./reducers/AuthSlice";

import ProductReducer from "./reducers/ProductSlice";
import CartReducer from "./reducers/CartSlice";
import OrderReducer from "./reducers/OrderSlice";
import FilterProductReducer from "./reducers/FilterProductSlice";
import CompareProductsReducer from "./reducers/CompareProductsSlice";

import { AppDispatch, RootState } from "../types/redux";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    product: ProductReducer,
    comparelist: CompareProductsReducer,
    productfilters: FilterProductReducer,
    cart: CartReducer,
    orders: OrderReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
