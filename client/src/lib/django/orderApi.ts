import { Order } from "../../types";
import { apiRequest } from "../axios/axiosClient";

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

export const fetchOrder = async (
  order_number: string | undefined
): Promise<Order> => {
  const response = await apiRequest({
    url: `/api/orders/${order_number}/`,
    method: "GET",
    requiresToken: true,
  });

  return response as Order;
};
export const fetchRecentUserOrders = async (userId: string | undefined) => {
  const response = await apiRequest<Order[]>({
    url: `/api/users/${userId}/orders/recent/`,
    method: "GET",
    requiresToken: true,
  });

  return response as Order[];
};
// Create an order
export const createOrder = (order: Partial<Order>): Promise<Partial<Order>> => {
  const data = apiRequest({
    url: "/api/orders/add/",
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
export const deliverOrder = async ({
  orderNumber,
}: {
  orderNumber: string;
}) => {
  const data = await apiRequest({
    url: `/api/orders/${orderNumber}/deliver/`,
    method: "PUT",
  });
  return data;
};

export const payOrder = async ({
  orderNumber,
}: {
  orderNumber: string | null;
}) => {
  const data = await apiRequest({
    url: `/api/orders/${orderNumber}/pay/`,
    method: "PUT",
  });

  return data;
};
