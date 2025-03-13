import { Link } from "react-router-dom";
import { calculateRemainingTime } from "../../../../helpers/utils";
import { Offer } from "../../../../types";
import { endpoint } from "../../../../lib/axios/axiosClient";
import NoDiscountOffers from "./NoDiscountOffers";

interface DiscountOffersListProps {
  offers: Offer[];
  now: Date;
}
export const DiscountOffersList = ({
  now,

  offers,
}: DiscountOffersListProps) => {
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
          {offers.map((product, i) => {
            const endDate = new Date(product.end_date);
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
                      src={`${endpoint}${product.thumbnail}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="max-h-[400px]">
                    <Link to="/">
                      <h3 className="overflow-hidden whitespace-nowrap text-ellipsis uppercase mb-1 text-2xl font-bold text-gray-800 ">
                        {product.name}
                      </h3>
                    </Link>

                    {product.description && (
                      <p className="ml-1  text-gray-600 text-xs mb-2">
                        {product.description}
                      </p>
                    )}

                    <div className="flex px-1 gap-3 text-gray-800 mb-2 text-lg">
                      <p className="font-bold">${product.price}</p>
                      {product.sale_price && (
                        <del className="text-gray-400">
                          ${product.sale_price}
                        </del>
                      )}
                    </div>

                    <button className="add-cart-btn font-bold uppercase px-8 py-3 bg-sky-600 text-white mb-2 transition-all duration-200 ease-out rounded-lg hover:bg-sky-500">
                      Add to Cart
                    </button>

                    <div className=" uppercase my-2">
                      <p>
                        Available: <b>{product.countInStock}</b>
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
