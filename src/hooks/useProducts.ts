import { useQuery } from "@tanstack/react-query";
import { fetchProductdDetail, fetchRecentProducts } from "../lib/productApi";

export const useRecentProducts = () => {
  return useQuery({
    queryKey: ["recentProducts"],
    queryFn: fetchRecentProducts,
  });
};

export const useProductDetail = (productSlug: string | undefined) => {
  return useQuery({
    queryKey: ["productDetail", productSlug],
    queryFn: () => fetchProductdDetail(productSlug),
    enabled: !!productSlug,
    retry: 3,
    staleTime: Infinity,
  });
};
