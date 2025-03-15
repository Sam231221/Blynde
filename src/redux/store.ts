import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducers/AuthSlice";
import CartReducer from "./reducers/CartSlice";
import FilterProductReducer from "./reducers/FilterProductSlice";
import CompareProductsReducer from "./reducers/CompareProductsSlice";

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
