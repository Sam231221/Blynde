import { Order } from "../types";
import { apiRequest } from "./axiosClient";

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
  const response = await apiRequest({
    url: `/api/orders/?page=${pageIndex}&limit=${pageSize}&sort=${sorting
      .map((sort) => `${sort.id}:${sort.desc ? "desc" : "asc"}`)
      .join(",")}`,
    method: "GET",
  });

  return response;
};
// Fetch order by ID
export const fetchOrderById = async (id: number): Promise<Order> => {
  const response = await apiRequest({
    url: `/api/orders/${id}/`,
    method: "GET",
  });
  return response as Order;
};

// Create an order
export const createOrder = (order: Partial<Order>): Promise<Partial<Order>> => {
  const data = apiRequest({
    url: "/api/orders/",
    method: "POST",
    data: order,
  }) as Promise<Partial<Order>>;
  return data;
};

// delete an order
export const deleteOrder = (order: Partial<Order>) => {
  const data = apiRequest({
    url: `/api/orders/${order._id}/`,
    method: "DELETE",
  });
  return data;
};

export const updateOrder = async ({
  id,
  updates,
}: {
  id: number;
  updates: Partial<Order>;
}): Promise<Order> => {
  const data = await apiRequest({
    url: `/api/orders/${id}/`,
    method: "PUT",
    data: updates,
  });
  return data as Order;
};
export const deliverOrder = async ({ orderId }: { orderId: number }) => {
  const data = await apiRequest({
    url: `/api/orders/${orderId}/deliver/`,
    method: "PUT",
  });
  return data;
};

export const payOrder = async ({ orderId }: { orderId: number }) => {
  const data = await apiRequest({
    url: `/api/orders/${orderId}/pay/`,
    method: "PUT",
  });

  return data;
};
