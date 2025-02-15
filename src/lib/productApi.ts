import { Pagination, Product } from "../types";
import { apiRequest } from "./api";

// Function to fetch products based on filters
export const fetchProducts = async (
  filters: Record<string, string>
): Promise<{ results: Product[]; pagination: Pagination }> => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (key !== "price" && Array.isArray(value)) {
      // Handle arrays (e.g., categories, sizes, etc.)
      if (value.length > 0) {
        params.append(key, value.join(","));
      }
    } else {
      // Special case for 'price' (we need to append two separate 'price' parameters)
      if (key === "price" && Array.isArray(value)) {
        // Append 'price' range separately, e.g., ?price=0&price=8
        if (value.length === 2) {
          params.append("min_price", String(value[0])); // min price
          params.append("max_price", String(value[1])); // max price
        }
      } else if (key === "ordering" && value !== "") {
        // Add ordering parameter only if it's not an empty string
        params.append("ordering", String(value));
      } else if (value !== undefined && value !== null) {
        // Add other parameters
        params.append(key, String(value));
      }
    }
  });
  // Make the API call
  const data = await apiRequest(
    `/api/products/all/?${params.toString()}`,
    "GET"
  );
  return data as { results: Product[]; pagination: Pagination };
};
