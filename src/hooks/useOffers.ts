import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "../lib/axios/axiosClient";
import { Discount } from "../types";

const fetchHighestDiscount = async () => {
  const response = await apiRequest({
    url: "/api/products/highest-priority-discountoffer/",
    method: "GET",
    requiresToken: false,
  });
  return response as Discount;
};

export const useHighestPriorityDiscount = () => {
  return useQuery({
    queryKey: ["highestDiscount"],
    queryFn: fetchHighestDiscount,
    staleTime: 1000 * 60 * 5,
  });
};

export const deleteHighestDiscount = async () => {
  const response = await apiRequest({
    url: "/api/products/highest-priority-discountoffer/delete/",
    method: "DELETE",
  });
  return response;
};
export const useDeleteHighestDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHighestDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highestDiscount"] });
    },
  });
};
