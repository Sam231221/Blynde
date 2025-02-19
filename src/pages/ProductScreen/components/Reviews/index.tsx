import Moment from "moment";
import ReviewForm from "./ReviewForm";
import Rating from "../../../../components/Rating";
import { Message } from "../../../../components/Message";

import { User, Review } from "../../../../types";
import { useProductReviews } from "../../../../hooks/useProductReviews";

interface ReviewsProps {
  productId: string | undefined;
  productSlug: string | undefined;
  userInfo: User | null;
}
export default function Reviews({
  productId,
  productSlug,
  userInfo,
}: ReviewsProps) {
  const {
    data: productReviews = [],
    isLoading,
    error,
  } = useProductReviews(productSlug);
  console.log(productReviews);
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800">
        Reviews({productReviews.length})
      </h1>
      <hr />
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : productReviews.length > 0 ? (
        productReviews
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt ?? "").getTime() -
              new Date(a.createdAt ?? "").getTime()
          )
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
                    <span className="font-semibold text-sm">
                      By {review.user.first_name} {review.user.last_name}
                    </span>
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
        {userInfo !== null && userInfo.username ? (
          <ReviewForm
            username={userInfo.username}
            userId={String(userInfo.id)}
            productId={productId}
            productSlug={productSlug}
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
