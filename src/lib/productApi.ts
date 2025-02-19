import { Pagination, Product } from "../types";
import { apiRequest } from "./axiosClient";

export const fetchProducts = async (
  filters: Record<string, string>
): Promise<{ results: Product[]; pagination: Pagination }> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (key !== "price" && Array.isArray(value)) {
      if (value.length > 0) {
        params.append(key, value.join(","));
      }
    } else {
      if (key === "price" && Array.isArray(value)) {
        if (value.length === 2) {
          params.append("min_price", String(value[0]));
          params.append("max_price", String(value[1]));
        }
      } else if (key === "ordering" && value !== "") {
        params.append("ordering", String(value));
      } else if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    }
  });

  const data = await apiRequest({
    url: `/api/products/all/?${params.toString()}`,
    method: "GET",
    requiresToken: false,
  });

  return data as { results: Product[]; pagination: Pagination };
};
