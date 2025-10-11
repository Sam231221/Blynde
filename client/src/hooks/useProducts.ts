import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProductDetail,
  fetchProducts,
  fetchRecentProducts,
  fetchRelatedProducts,
} from "../lib/django/productApi";

import { Category, Color, Product, Size } from "../types";
import { apiRequest } from "../lib/axios/axiosClient";
import { Pagination } from "../types/common/pagination";
import { useProductFilters } from "../redux/reducers/FilterProductSlice";

export const useProductCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await apiRequest({
        url: "/api/products/categories/",
        method: "GET",
        requiresToken: false,
      });
      return (data as Category[]) || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};
export const useProductColors = () => {
  return useQuery<Color[], Error>({
    queryKey: ["colors"],
    queryFn: async () => {
      const data = await apiRequest({
        url: "/api/products/colors/",
        method: "GET",
        requiresToken: false,
      });
      return data as Color[];
    },
    staleTime: 1000 * 60 * 5,
  });
};
export const useProductSizes = () => {
  return useQuery<Size[], Error>({
    queryKey: ["sizes"],
    queryFn: async () => {
      const data = await apiRequest({
        url: "/api/products/sizes/",
        method: "GET",
        requiresToken: false,
      });
      return (data as Size[]) || [];
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductsQuery = () => {
  const filters = useProductFilters();
  const [debouncedFilters] = useDebounce(filters, 500);

  return useQuery<{ results: Product[]; pagination: Pagination }>({
    queryKey: ["products", debouncedFilters],
    queryFn: () =>
      fetchProducts(debouncedFilters as unknown as Record<string, string>),
    staleTime: 1000 * 60 * 5,
  });
};
export const useRecentProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["recentProducts"],
    queryFn: fetchRecentProducts,
  });
};
export const useRelatedProducts = (productSlug: string | undefined) => {
  return useQuery<Product[]>({
    queryKey: ["relatedProducts", productSlug],
    queryFn: () => fetchRelatedProducts(productSlug),
    enabled: !!productSlug,
  });
};

export const useProductDetail = (productSlug: string | undefined) => {
  return useQuery<Product>({
    queryKey: ["productDetail", productSlug],
    queryFn: () => fetchProductDetail(productSlug),
  });
};
