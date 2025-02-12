import { Order } from "../types";
import { apiRequest } from "./api";

export const updateOrder = async ({
  id,
  updates,
}: {
  id: number;
  updates: Partial<Order>;
}): Promise<Order> => {
  const data = await apiRequest(`/api/orders/${id}/`, "PUT", updates);
  return data;
};
export const deliverOrder = async ({ orderId }: { orderId: number }) => {
  const data = await apiRequest(`/api/orders/${orderId}/deliver/`, "PUT");
  return data;
};
export const payOrder = async ({ orderId }: { orderId: number }) => {
  const data = await apiRequest(`/api/orders/${orderId}/pay/`, "PUT");

  return data;
};
// Fetch orders
export const fetchOrders = async (): Promise<Order[]> => {
  const data = await apiRequest("/api/orders/myorders/", "GET");
  return data;
};

// Fetch order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  const response = await apiRequest(`/api/orders/${id}/`, "GET");
  return response;
};

// Create an order
export const createOrder = (order: Partial<Order>) => {
  const data = apiRequest("/api/orders/add/", "POST", order);
  return data;
};
