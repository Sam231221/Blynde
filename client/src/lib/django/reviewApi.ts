import { Review } from "../../types";
import { apiRequest, RequestBody } from "../axios/axiosClient";

export const fetchProductReviews = async (productSlug: string) => {
  const response = await apiRequest({
    url: `/api/products/${productSlug}/reviews/`,
    method: "GET",
    requiresToken: true,
  });
  return response as Review[];
};

export const addProductReview = async (review: RequestBody) => {
  const response = await apiRequest({
    url: "/api/products/reviews/",
    method: "POST",
    data: review,
    requiresToken: true,
  });

  return response;
};
