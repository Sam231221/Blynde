import React, { useEffect, useState } from "react";

import ReviewForm from "./ReviewForm";
import Rating from "../../../../components/Rating";
import { useSelector } from "react-redux";
import { Message } from "../../../../components/Message";
import axios from "../../../../lib/api";
import Moment from "moment";

export default function Reviews({ productId, userInfo }) {
  const [reviews, setReviews] = useState([]); // State for storing reviews
  const { success } = useSelector((state) => state.reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}/reviews/`);
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId, success]);
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800">
        Reviews({reviews.length})
      </h1>
      <hr />

      {reviews.length > 0 ? (
        reviews
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((review, index) => (
            <div key={index}>
              <div className="flex items-center gap-4 mb-3">
                <img
                  className="w-14 h-14 rounded-full"
                  src="https://secure.gravatar.com/avatar/dd28514c9a8cfba334e05f21703be28e?s=60&d=mm&r=g"
                  alt=""
                />
                <div className="flex flex-col">
                  <Rating
                    fontSize={12}
                    value={review.rating}
                    color={"#fc8c04"}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{review.name}</span>
                    <div className=" w-[20px] h-[1px] bg-black"></div>
                    <span className="text-gray-400">
                      {Moment(review.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </span>
                  </div>
                  <p className="text-xs tracking-wide">{review.comment}</p>
                </div>
              </div>
            </div>
          ))
      ) : (
        <p>No reviews yet.</p>
      )}
      <div className="mb-4">
        {userInfo.name ? (
          <ReviewForm user={userInfo.name} productId={productId} />
        ) : (
          <>
            <Message variant="alert">You need to sigin to add a review</Message>
          </>
        )}
      </div>
    </>
  );
}
