import React, { useEffect, useState } from "react";

import ReviewForm from "./ReviewForm";
import Rating from "../../../../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../../../../components/Message";

import Moment from "moment";
import { AppDispatch, RootState } from "../../../../types";
import { fetchReviews } from "../../../../redux/reducers/ReviewSlice";

export default function Reviews({ productId, userInfo }) {
  const dispatch = useDispatch<AppDispatch>();
  console.log("useringo", userInfo);
  const { reviews, loading: reviewLoading } = useSelector(
    (state: RootState) => state.reviews
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviews());
    }
  }, [productId, dispatch]);
  const productReviews = reviews.filter(
    (review) => review.product === Number(productId)
  );
  console.log("dsd:", productReviews.length);
  return (
    <>
      <h1 className="text-xl font-semibold text-gray-800">
        Reviews({productReviews.length})
      </h1>
      <hr />
      {reviewLoading ? (
        <p>Loading reviews...</p>
      ) : productReviews.length > 0 ? (
        productReviews
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
        <p className="text-sm my-2">No reviews yet. Be the first to review!</p>
      )}

      <div className="mb-4">
        {userInfo !== null && userInfo.name ? (
          <ReviewForm
            username={userInfo.name}
            userId={userInfo.id}
            productId={productId}
          />
        ) : (
          <div className="w-80">
            <Message variant="alert">You need to sigin to add a review</Message>
          </div>
        )}
      </div>
    </>
  );
}
