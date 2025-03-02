import { WishlistItem } from "..";

export interface WishlistItemCreatePayload {
  product: string;
}

export interface DeleteWishlistPayload {
  productId: number;
}

export interface WishlistState {
  loading: boolean;
  error: boolean;
  wishlistItems: WishlistItem[];
}
