import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AuthReducer from "./reducers/AuthSlice";
import CartReducer from "./reducers/CartSlice";
import FilterProductReducer from "./reducers/FilterProductSlice";
import CompareProductsReducer from "./reducers/CompareProductsSlice";
import { AppDispatch, RootState } from "../types/redux";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    comparelist: CompareProductsReducer,
    productfilters: FilterProductReducer,
    cart: CartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
