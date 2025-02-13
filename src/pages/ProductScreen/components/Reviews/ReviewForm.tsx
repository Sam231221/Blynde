import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../../components/Rating";
import { addReview } from "../../../../redux/reducers/ReviewSlice";
import { AppDispatch, Review, RootState } from "../../../../types";
import DOMPurify from "dompurify";
interface ReviewFormProps {
  productId: string;
  userId: string;
  username: string;
}
const ReviewForm = ({ productId, userId, username }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.reviews);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sanitizedComment = DOMPurify.sanitize(comment);

    if (!sanitizedComment || rating === 0) {
      alert("Please fill out all fields.");
      return;
    }

    if (sanitizedComment.length > 500) {
      // Example comment length limit
      alert("Comment is too long (max 500 characters).");
      return;
    }

    const productIdNumber = Number(productId);
    if (isNaN(productIdNumber)) {
      alert("Invalid product ID.");
      return;
    }

    const reviewData: Review = {
      product: productIdNumber,
      user: userId,
      name: username,
      rating: rating,
      comment: sanitizedComment,
    };

    dispatch(addReview(reviewData));
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
        disabled={loading}
        type="submit"
        className="px-3 py-2 mb-3 text-black bg-gray-200 hover:bg-gray-900 hover:text-white border border-gray-400 rounded-sm text-medium"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
