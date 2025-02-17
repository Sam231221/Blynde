import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../lib/axiosClient";

const fetchAllProducts = async () => {
  const response = await apiRequest({
    url: "api/products",
    method: "GET",
    requiresToken: false,
  });
  return response;
};

export const fetchRecentProducts = async () => {
  const response = await apiRequest({
    url: "api/products/recents",
    method: "GET",
    requiresToken: false,
  });

  return response;
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
  });
};

export const useRecentProducts = () => {
  return useQuery({
    queryKey: ["recentProducts"],
    queryFn: fetchRecentProducts,
  });
};
