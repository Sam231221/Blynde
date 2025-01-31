import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import apiClient from "../lib/api";
import { Product } from "../types";

const fetchAllProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

const fetchTopProducts = async () => {
  const response = await apiClient.get("/products/top");
  return response.data;
};

export const fetchRecentProducts = async () => {
  const response = await apiClient.get("/api/products/recents");

  return response.data;
};

export const useAllProducts = () => {
  return useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
  });
};

export const useTopProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["topProducts"],
    queryFn: fetchTopProducts,
    onError: (error) => {
      console.error("Error fetching top products:", error);
    },
  });
};

export const useRecentProducts = () => {
  return useQuery({
    queryKey: ["recentProducts"],
    queryFn: fetchRecentProducts,
  });
};
