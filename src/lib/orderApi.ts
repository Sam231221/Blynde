// Your Axios instance
import store from "../redux/store";
import { Order } from "../types";
import apiClient from "./api";

// Fetch orders
export const fetchOrders = async (): Promise<Order[]> => {
  const state = store.getState();
  const userInfo = state.auth.userInfo ? state.auth.userInfo.token : "";

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo}`,
    },
  };
  const { data } = await apiClient.get("/api/orders/myorders/", config);

  return data;
};

// Fetch order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  const state = store.getState();
  const userInfo = state.auth.userInfo ? state.auth.userInfo.token : "";

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo}`,
    },
  };
  const { data } = await apiClient.get(`/api/orders/${id}/`, config);
  return data;
};

// Create an order
export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  const { data } = await apiClient.post("/api/orders/add/", order);
  return data;
};
