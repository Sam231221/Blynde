import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WishlistResponse } from "../types";
import {
  createOrDeleteWishlistItem,
  fetchUserWishlist,
} from "../lib/django/wishlistApi";

export const useUserWishlist = () => {
  return useQuery<WishlistResponse, Error>({
    queryKey: ["wishlistItems"],
    queryFn: fetchUserWishlist,
    staleTime: 1000 * 60 * 5,
  });
};
export function useCreateOrDeleteWishlistItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrDeleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlistItems"] });
    },
  });
}
