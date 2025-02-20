import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addProductReview, fetchProductReviews } from "../lib/reviewApi";

export const useProductReviews = (productSlug: string) => {
  return useQuery({
    queryKey: ["productReviews", productSlug],
    queryFn: () => fetchProductReviews(productSlug),
    enabled: !!productSlug,
    retry: 3,
    staleTime: Infinity,
  });
};

export const useAddProductReview = (productSlug: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProductReview,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productReviews", productSlug],
      });
    },
  });
};
