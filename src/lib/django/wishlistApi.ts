import { WishlistItem } from "../../types";
import { WishlistResponse } from "../../types/api/responses";
import { apiRequest } from "../axios/axiosClient";

export const fetchUserWishlist = async (): Promise<WishlistResponse> => {
  const response = await apiRequest({
    url: "/api/users/wishlist/",
    method: "GET",
  });
  return (response as WishlistResponse) || [];
};

export const createOrDeleteWishlistItem = async (
  productId: string
): Promise<WishlistItem | number> => {
  const response = await apiRequest({
    url: "/api/users/wishlist/",
    method: "POST",
    data: { product: productId },
  });
  return (response as WishlistItem) || Number;
};
