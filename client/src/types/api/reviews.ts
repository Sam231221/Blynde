import { Review } from "..";

export interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: { message: string; code?: number } | null;
  showReviewForm: boolean;
}
