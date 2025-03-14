import { Link } from "react-router-dom";
import { calculateRemainingTime } from "../../../../helpers/utils";
import { Offer } from "../../../../types";
import NoDiscountOffers from "./NoDiscountOffers";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../../redux/store";
import { addToCart } from "../../../../redux/reducers/CartSlice";

interface DiscountOffersListProps {
  offers: Offer[];
  now: Date;
}
export const DiscountOffersList = ({
  now,

  offers,
}: DiscountOffersListProps) => {
  console.log(offers);
  const dispatch = useAppDispatch();
  const addToCartHandler = (offer: Offer) => {
    if (offer) {
      dispatch(
        addToCart({
          productId: String(offer._id),
          name: offer.name,
          price: offer.sale_price ? offer.sale_price : Number(offer.price),
          color: "",
          size: "",
          thumbnailUrl: offer.thumbnail_url,
          qty: 1,
        })
      );
      toast.success(`${offer.name} added to cart x 1`);
    } else {
      toast.error("Please select size and color");
    }
  };
  return (
    <>
      {offers.length > 0 ? (
        <div
          className="flex items-center mb-10 mt-4 gap-5 overflow-x-auto has-scrollbar"
          style={{
            overscrollBehaviorInline: "contain",
            scrollSnapType: "inline",
          }}
        >
          {offers.map((offer, i) => {
            const endDate = new Date(offer.end_date);
            const remaining = calculateRemainingTime(endDate, now);
            return (
              <div
                key={i}
                className="min-w-full p-8 border border-gray-200 rounded-sm "
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <div className="max-w-[900px] w-[800px] h-[400px]">
                    <img
                      src={offer.thumbnail_url}
                      alt={offer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="max-h-[400px]">
                    <Link to="/">
                      <h3 className="overflow-hidden whitespace-nowrap text-ellipsis uppercase mb-1 text-2xl font-bold text-gray-800 ">
                        {offer.name}
                      </h3>
                    </Link>

                    {offer.description && (
                      <p className="ml-1  text-gray-600 text-xs mb-2">
                        {offer.description}
                      </p>
                    )}

                    <div className="flex px-1 gap-3 text-gray-800 mb-2 text-lg">
                      <p className="font-bold">${offer.price}</p>
                      {offer.sale_price && (
                        <del className="text-gray-400">${offer.sale_price}</del>
                      )}
                    </div>

                    <button
                      onClick={() => addToCartHandler(offer)}
                      className={`${
                        offer.countInStock <= 0
                          ? "bg-sky-200"
                          : "bg-sky-500 hover:bg-sky-600"
                      } rounded-lg w-full font-medium  text-white py-2 px-4`}
                      disabled={offer.countInStock <= 0}
                      type="button"
                    >
                      {" "}
                      Add to Cart
                    </button>

                    <div className=" uppercase my-2">
                      <p>
                        Available: <b>{offer.countInStock}</b>
                      </p>
                    </div>

                    <div className="countdown-box">
                      <p className="countdown-desc text-gray-700 tracking-wider uppercase mb-2 font-medium text-sm">
                        Hurry Up! Offer ends in:
                      </p>

                      <div className="flex gap-2">
                        <div className="text-center bg-zinc-200 rounded-md p-2">
                          <p className="display-number text-gray-800 font-medium text-lg min-w-[40px]">
                            {remaining.remainingDays}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Days</p>
                        </div>
                        <div className="text-center bg-zinc-200 rounded-md p-2">
                          <p className="display-number text-gray-800 font-medium text-lg min-w-[40px]">
                            {remaining.remainingHours}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Hours</p>
                        </div>
                        <div className="text-center bg-zinc-200 rounded-md p-2">
                          <p className="display-number text-gray-800 font-medium text-lg min-w-[40px]">
                            {remaining.remainingMinutes}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Minutes</p>
                        </div>

                        <div className="text-center bg-zinc-200 rounded-md p-2">
                          <p className="display-number text-gray-800 font-medium text-lg min-w-[40px]">
                            {remaining.remainingSeconds}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Sec</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoDiscountOffers />
      )}
    </>
  );
};
