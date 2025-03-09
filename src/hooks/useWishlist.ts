import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createOrDeleteWishlistItem,
  fetchUserWishlist,
} from "../lib/django/wishlistApi";
import {
  WishlistAddOrDeleteResponse,
  WishlistItemsListResponse,
} from "../types/api/wishlist";

export const useUserWishlist = () => {
  return useQuery<WishlistItemsListResponse, Error>({
    queryKey: ["wishlistItems"],
    queryFn: fetchUserWishlist,
    staleTime: 1000 * 60 * 5,
  });
};
export function useCreateOrDeleteWishlistItem() {
  const queryClient = useQueryClient();
  return useMutation<WishlistAddOrDeleteResponse, Error, string>({
    mutationFn: createOrDeleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
    },
  });
}
