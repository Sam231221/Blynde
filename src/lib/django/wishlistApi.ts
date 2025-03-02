import { WishlistItem } from "../../types";
import {
  WishlistAddOrDeleteResponse,
  WishlistItemsListResponse,
  WishlistResponse,
} from "../../types/wishlist";
import { apiRequest } from "../axios/axiosClient";

export const fetchUserWishlist = async () => {
  const response = await apiRequest<WishlistItemsListResponse>({
    url: "/api/users/wishlist/",
    method: "GET",
  });
  return (response as WishlistItemsListResponse) || [];
};

export const createOrDeleteWishlistItem = async (wishlistItemId: string) => {
  const response = await apiRequest<WishlistAddOrDeleteResponse>({
    url: "/api/users/wishlist/",
    method: "POST",
    data: { wishlistItemId },
  });
  return response as WishlistAddOrDeleteResponse;
};
