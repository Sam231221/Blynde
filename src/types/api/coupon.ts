export interface ApplyCouponSuccessResponse {
  discounted_price: number;
  discount_percentage: number;
  valid: boolean;
  message?: string;
}
export interface ApplyCouponErrorResponse {
  message: string;
}

export interface ApplyCouponVariables {
  productSlug: string;
  couponCode: string;
}
export interface DeleteDiscountResponse {
  message: string;
}
