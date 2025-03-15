import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrder,
  fetchOrder,
  fetchRecentUserOrders,
  payOrder,
} from "../lib/django/orderApi";
import { Order } from "../types";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/reducers/CartSlice";
import { queryClient } from "../lib/axios/queryClient";
import { toast } from "react-toastify";
import { useAppDispatch } from "../types/redux";

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

export const usePlaceUserOrder = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (newOrder: Partial<Order>) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      dispatch(clearCart());
      navigate(`/orders/${newOrder.order_number}`);
    },
    onError: (error) => {
      console.error(error);
      toast.error("There was an error while creating your order.");
    },
  });
};

export const usePayUserOrder = (order_number: string | null) => {
  return useMutation({
    mutationFn: () => payOrder({ orderNumber: order_number }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", order_number] });
    },
  });
};
