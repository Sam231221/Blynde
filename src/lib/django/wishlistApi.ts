import { apiRequest } from "../axios/axiosClient";
import {
  WishlistAddOrDeleteResponse,
  WishlistItemsListResponse,
} from "../../types/api/wishlist";

export const fetchUserWishlist = async () => {
  const response = await apiRequest<WishlistItemsListResponse>({
    url: "/api/users/wishlist/",
    method: "GET",
  });
  return (response as WishlistItemsListResponse) || [];
};

export const createOrDeleteWishlistItem = async (productId: string) => {
  const response = await apiRequest<WishlistAddOrDeleteResponse>({
    url: "/api/users/wishlist/",
    method: "POST",
    data: { product: productId },
  });
  return response as WishlistAddOrDeleteResponse;
};
