import { createSlice } from "@reduxjs/toolkit";

export const OrderCreateSlice = createSlice({
  name: "OrderCreate",
  initialState: {
    loading: true,
    error: false,
    success: false,
    //single order
    order: [],
  },
  reducers: {
    ORDER_CREATE_REQUEST: (state, action) => {
      return state;
    },

    ORDER_CREATE_SUCCESS: (state, action) => {
      return { ...state, loading: false, success: true, order: action.payload };
    },

    ORDER_CREATE_FAIL: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },

    ORDER_CREATE_RESET: (state, action) => {
      return {
        ...state,
        order: [],
      };
    },
  },
});

export const {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
} = OrderCreateSlice.actions;
export default OrderCreateSlice.reducer;
