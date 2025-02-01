import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, RootState } from "../../types";

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      console.log("eee:", action.payload);
      state.selectedOrder = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { setOrders, setSelectedOrder, addOrder } = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectSelectedOrder = (state: RootState) =>
  state.orders.selectedOrder;

export default orderSlice.reducer;
