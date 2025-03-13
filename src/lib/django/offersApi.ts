import { Offer } from "../../types";
import { ApplyCouponSuccessResponse } from "../../types/api/coupon";
import { apiRequest } from "../axios/axiosClient";

export const fetchDiscountOffers = async (): Promise<Offer[]> => {
  const response = await apiRequest({
    url: "/api/products/discountoffers/",
    method: "GET",
    requiresToken: false,
  });
  return response as Offer[];
};

export const deleteExpiredOffer = async (offerId: string): Promise<void> => {
  await apiRequest({
    url: `/api/products/discountoffers/${offerId}/`,
    method: "DELETE",
    requiresToken: true,
  });
};

export const applyProductCoupon = async (
  productSlug: string,
  couponCode: string
) => {
  const response = await apiRequest<ApplyCouponSuccessResponse>({
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
