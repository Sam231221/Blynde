import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addProductReview, fetchReviews } from "../lib/reviewApi";

export const useProductReviews = (productSlug: string) => {
  return useQuery({
    queryKey: ["productReviews", productSlug],
    queryFn: () => fetchReviews(productSlug),
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
      console.log("productSlug:", productSlug);
      queryClient.invalidateQueries({
        queryKey: ["productReviews", productSlug],
      });
    },
  });
};
