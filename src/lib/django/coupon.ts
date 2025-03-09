import { apiRequest } from "../axios/axiosClient";

import { Discount } from "../../types";
import { DeleteDiscountResponse } from "../../types/api/coupon";

export const fetchHighestDiscount = async () => {
  const response = await apiRequest<Discount>({
    url: "/api/products/highest-priority-discountoffer/",
    method: "GET",
    requiresToken: false,
  });
  return response as Discount;
};
export const deleteHighestDiscount = async () => {
  const response = await apiRequest<DeleteDiscountResponse>({
    url: "/api/products/highest-priority-discountoffer/delete/",
    method: "DELETE",
  });
  return response;
};
