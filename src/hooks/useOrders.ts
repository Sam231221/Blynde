import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../lib/django/orderApi";

export const useOrders = (order_number: string | undefined) => {
  return useQuery({
    queryKey: ["order", order_number],
    queryFn: () => fetchOrder(order_number),
  });
};
