import { useQuery } from "@tanstack/react-query";
import { fetchOrder, fetchRecentUserOrders } from "../lib/django/orderApi";
import { Order } from "../types";

export const useOrders = (order_number: string | undefined) => {
  return useQuery({
    queryKey: ["order", order_number],
    queryFn: () => fetchOrder(order_number),
  });
};
export const useRecentUserOrders = (userId: string | undefined) => {
  return useQuery<Order[], Error>({
    queryKey: ["userOrders", userId, "recent"],
    queryFn: () => fetchRecentUserOrders(userId),
    enabled: !!userId,
  });
};
