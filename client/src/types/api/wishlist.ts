import { Product, WishlistItem } from "..";
import { ApiErrorResponse } from "../common/response";

export interface WishlistItemsListResponse {
  count: number;
  items: WishlistItem[];
}
export type WishlistAddOrDeleteResponse =
  | ApiErrorResponse
  | WishlistAddResponse
  | number;

export interface WishlistAddResponse {
  id: number;
  product: Product;
  date_added: string;
}
