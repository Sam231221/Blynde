import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  applyProductCoupon,
  fetchDiscountOffers,
} from "../lib/django/offersApi";
import {
  ApplyCouponErrorResponse,
  ApplyCouponSuccessResponse,
  ApplyCouponVariables,
  DeleteDiscountResponse,
} from "../types/api/coupon";
import {
  deleteHighestDiscount,
  fetchHighestDiscount,
} from "../lib/django/coupon";
import { Offer } from "../types";

export const useProductCoupon = () => {
  return useMutation<
    ApplyCouponSuccessResponse,
    ApplyCouponErrorResponse,
    ApplyCouponVariables
  >({
    mutationFn: async ({ productSlug, couponCode }) => {
      return applyProductCoupon(productSlug, couponCode);
    },
  });
};
export const useDiscountOffers = () => {
  return useQuery<Offer[]>({
    queryKey: ["discountOffers"],
    queryFn: fetchDiscountOffers,
  });
};
export const useHighestPriorityDiscount = () => {
  return useQuery({
    queryKey: ["highestDiscount"],
    queryFn: fetchHighestDiscount,
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteHighestDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteDiscountResponse, Error>({
    mutationFn: deleteHighestDiscount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highestDiscount"] });
    },
  });
};
