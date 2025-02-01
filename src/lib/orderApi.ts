// Your Axios instance
import store from "../redux/store";
import { Order } from "../types";
import apiClient from "./api";
const state = store.getState();
const userToken = state.auth.userInfo ? state.auth.userInfo.token : "";

export const updateOrder = async ({
  id,
  updates,
}: {
  id: number;
  updates: Partial<Order>;
}): Promise<Order> => {
  const { data } = await apiClient.put(`/api/orders/${id}/`, updates);
  return data;
};
export const deliverOrder = async ({ orderId }: { orderId: number }) => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const { data } = await apiClient.put(
    `/api/orders/${orderId}/deliver/`,
    {},
    config
  );
  return data;
};

// Fetch orders
export const fetchOrders = async (): Promise<Order[]> => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const { data } = await apiClient.get("/api/orders/myorders/", config);

  return data;
};

// Fetch order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const { data } = await apiClient.get(`/api/orders/${id}/`, config);
  return data;
};

// Create an order
export const createOrder = async (order: Partial<Order>): Promise<Order> => {
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
  const { data } = await apiClient.post("/api/orders/add/", order, config);
  return data;
};
