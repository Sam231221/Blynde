import { ApplyCouponSuccessResponse } from "../../types/wishlist";
import { apiRequest } from "../axios/axiosClient";

export const applyProductCoupon = async (
  productSlug: string,
  couponCode: string
): Promise<ApplyCouponSuccessResponse> => {
  const response = await apiRequest({
    url: `/api/products/${productSlug}/apply-coupon/`,
    method: "POST",
    data: { coupon_code: couponCode },
  });
  return response as ApplyCouponSuccessResponse;
};

export const applyOrderCoupon = async ({
  orderId,
  couponCode,
}: {
  orderId: string;
  couponCode: string;
}) => {
  const response = await apiRequest({
    url: `/api/orders/${orderId}/apply-coupon/`,
    method: "POST",
    data: { couponCode },
  });

  return response;
};
