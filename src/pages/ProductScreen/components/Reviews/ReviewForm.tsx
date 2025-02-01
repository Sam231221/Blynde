import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../../../components/Rating";
import { addReview } from "../../../../redux/reducers/ReviewSlice";
import { AppDispatch, RootState } from "../../../../types";

const ReviewForm = ({ productId, userId, username }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.reviews
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment || rating === 0) {
      alert("Please fill out all fields.");
      return;
    }

    dispatch(
      addReview({
        product: Number(productId),
        user: userId, // Assume logged-in user ID (should be dynamic)
        name: username,
        rating: rating,
        comment: comment,
      })
    );
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl my-3 text-gray-900 ">Add a Review</h1>
      <hr />
      <br />
      {error && <p>Error: {error}</p>}
      {success && <p>Review submitted successfully!</p>}
      <div className="flex flex-col mb-2">
        <label className="text-xs mb-1" htmlFor="">
          Your rating: <span>*</span>
        </label>
        <div className="flex gap-3">
          <Rating
            className="text-gray-500"
            count={5}
            value={rating}
            hoverEnabled
            onChange={setRating}
            fontSize="14px"
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
          cols="45"
          rows="8"
          required=""
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
