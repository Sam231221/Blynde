import React, { useState, useEffect } from "react";
import axios, { endpoint } from "../../../../lib/api";

import { Link } from "react-router-dom";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

//based on end date, calculate remaining time i.e days, hours, minutes, seconds
const calculateRemainingTime = (endDate) => {
  const now = new Date();
  const diffInDays = differenceInDays(endDate, now);
  const diffInHours = differenceInHours(endDate, now) % 24;
  const diffInMinutes = differenceInMinutes(endDate, now) % 60;
  const diffInSeconds = differenceInSeconds(endDate, now) % 60;

  return {
    remainingDays: diffInDays,
    remainingHours: diffInHours,
    remainingMinutes: diffInMinutes,
    remainingSeconds: diffInSeconds,
  };
};

const DiscountOffers = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/products/discountoffers/`); // Replace with your API endpoint
        const updatedOffers = response.data.map((offer) => {
          const endDate = new Date(offer.end_date);
          return {
            ...offer,
            ...calculateRemainingTime(endDate),
          };
        });
        setOffers(updatedOffers);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setOffers((prevOffers) => {
        return prevOffers
          .map((offer) => {
            const endDate = new Date(offer.end_date);
            const newRemainingTime = calculateRemainingTime(endDate);

            if (
              newRemainingTime.remainingDays <= 0 &&
              newRemainingTime.remainingHours <= 0 &&
              newRemainingTime.remainingMinutes <= 0 &&
              newRemainingTime.remainingSeconds <= 0
            ) {
              axios
                .delete(`/api/products/discountoffers/${offer.id}/delete/`)
                .catch((error) =>
                  console.error("Error deleting offer:", error)
                );
              return null;
            }

            return { ...offer, ...newRemainingTime };
          })
          .filter((offer) => offer !== null);
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <h2 className="text-2xl md:text-3xl mb-2 md:w-1/3 md:mb-0 font-semibold text-zinc-900">
          Don&apos;t Miss Our Deals
        </h2>
        <p className="text-zinc-500 md:w-2/3 text-sm tracking-wider">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </p>
      </div>
      <div className="container">
        {isLoading ? (
          <p>Loading offers...</p>
        ) : error ? (
          <div className="container mx-auto py-8 px-4">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error.message}</span>
            </div>
          </div>
        ) : offers.length > 0 ? (
          <div
            className="flex items-center mb-10 mt-4 gap-5 overflow-x-auto has-scrollbar"
            style={{
              overscrollBehaviorInline: "contain",
              scrollSnapType: "inline",
            }}
          >
            {offers.map((product, i) => (
              <div
                key={i}
                className="min-w-full p-8 border border-gray-200 rounded-sm "
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <div className="w-full h-[300px]">
                    <img
                      src={`${endpoint}${product.thumbnail}`}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="mt-8">
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
                            {product.remainingDays}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Days</p>
                        </div>
                        <div className="text-center bg-zinc-200 rounded-md p-2">
                          <p className="display-number text-gray-800 font-medium text-lg min-w-[40px]">
                            {product.remainingHours}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Hours</p>
                        </div>
                        <div className="text-center bg-zinc-200 rounded-md p-2">
                          <p className="display-number text-gray-800 font-medium text-lg min-w-[40px]">
                            {product.remainingMinutes}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Minutes</p>
                        </div>

                        <div className="text-center bg-zinc-200 rounded-md p-2">
                          <p className="display-number text-gray-800 font-medium text-lg min-w-[40px]">
                            {product.remainingSeconds}
                          </p>
                          <p className="text-[12px] text-gray-700  ">Sec</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container mx-auto py-8 px-4">
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">
                No discount offers available at the moment.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountOffers;
