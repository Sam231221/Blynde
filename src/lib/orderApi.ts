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
  return data as Order;
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
export const fetchOrders = async ({
  pageIndex,
  pageSize,
  sorting,
}: {
  pageIndex: number;
  pageSize: number;
  sorting: { id: string; desc: boolean }[];
}) => {
  const response = await apiRequest(`/api/orders/myorders/`, "GET", {
    params: {
      page: pageIndex + 1,
      limit: pageSize,
      sortBy: sorting[0]?.id,
      sortOrder: sorting[0]?.desc ? "desc" : "asc",
    },
  });

  return response;
};
// Fetch order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  const response = await apiRequest(`/api/orders/${id}/`, "GET");
  return response as Order;
};

// Create an order
export const createOrder = (order: Partial<Order>): Promise<Partial<Order>> => {
  const data = apiRequest("/api/orders/add/", "POST", order) as Promise<
    Partial<Order>
  >;
  return data;
};

// delete an order
export const deleteOrder = (order: Partial<Order>) => {
  const data = apiRequest("/api/orders/", "POST", order);
  return data;
};
