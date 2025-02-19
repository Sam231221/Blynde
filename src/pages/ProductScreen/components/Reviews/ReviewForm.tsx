import { useState } from "react";
import DOMPurify from "dompurify";
import Rating from "../../../../components/Rating";

import { useAddProductReview } from "../../../../hooks/useProductReviews";
interface ReviewFormProps {
  productId: string | undefined;
  productSlug: string | undefined;
  userId: string;
  username: string;
}
const ReviewForm = ({ productId, productSlug, userId }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    mutate: addProductReview,
    isPending,
    error,
  } = useAddProductReview(productSlug);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedComment = DOMPurify.sanitize(comment);

    if (!sanitizedComment || rating === 0) {
      alert("Please fill out all fields.");
      return;
    }

    if (sanitizedComment.length > 500) {
      alert("Comment is too long (max 500 characters).");
      return;
    }

    if (!productId) {
      alert("ProductId is missing.");
      return;
    }

    addProductReview({
      rating: rating,
      comment: sanitizedComment,
      product: productId,
      user: userId,
    });

    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl mt-5  text-gray-900 font-semibold">
        Add a Review
      </h1>
      <hr />
      <br />
      {error && <p>Error: {error.message}</p>}

      <div className="flex flex-col mb-2">
        <label className="text-xs mb-1" htmlFor="comment">
          Your rating: <span>*</span>
        </label>
        <div className="flex gap-3">
          <Rating
            className="text-gray-500"
            count={5}
            value={rating}
            hoverEnabled
            onChange={setRating}
            fontSize={14}
          />
        </div>
      </div>
      <div className="flex flex-col mb-2">
        <label className="text-xs mb-1" htmlFor="">
          Your review: <span>*</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border text-xs border-gray-300/40 focus:outline-none p-2"
          id="comment"
          name="comment"
          cols={45}
          rows={8}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-3 py-2 mb-3 text-black bg-gray-200 hover:bg-gray-900 hover:text-white border border-gray-400 rounded-sm text-medium"
      >
        {isPending ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
