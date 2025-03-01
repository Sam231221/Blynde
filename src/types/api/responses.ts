import { WishlistItem } from "..";

export interface ApplyCouponSuccessResponse {
  discounted_price: number;
  discount_percentage: number;
  valid: boolean;
}
export interface WishlistResponse {
  count: number;
  items: WishlistItem[];
}
export interface ApiErrorResponse {
  errors: {
    [key: string]: string;
  };
  detail?: string;
}
