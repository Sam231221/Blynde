import React, { useState, useEffect } from "react";
import DiscountOffersLoader from "../../../../components/Fallbacks/Loadings/DiscountOffersLoader";
import { ServerDownError } from "../../../../components/Fallbacks/Errors/ServerDownError";
import { useDiscountOffers } from "../../../../hooks/useOffers";
import { queryClient } from "../../../../lib/axios/queryClient";
import { Offer } from "../../../../types";
import { calculateRemainingTime } from "../../../../helpers/utils";
import { deleteExpiredOffer } from "../../../../lib/django/offersApi";
import { DiscountOffersList } from "./DiscountOffersList";

const DiscountOffers: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const { data: offers, isLoading, isError, refetch } = useDiscountOffers();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newNow = new Date();
      setNow(newNow);

      const currentOffers = queryClient.getQueryData<Offer[]>([
        "discountOffers",
      ]);
      if (currentOffers) {
        currentOffers.forEach((offer) => {
          const endDate = new Date(offer.end_date);
          const remaining = calculateRemainingTime(endDate, newNow);

          if (
            remaining.remainingDays <= 0 &&
            remaining.remainingHours <= 0 &&
            remaining.remainingMinutes <= 0 &&
            remaining.remainingSeconds <= 0
          ) {
            deleteExpiredOffer(offer._id).catch(console.error);
            queryClient.setQueryData(["discountOffers"], (oldData: Offer[]) =>
              oldData ? oldData.filter((o) => o._id !== offer._id) : oldData
            );
          }
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [queryClient]);

  return (
    <div className="container mx-auto mb-4">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <h2 className="text-2xl md:text-3xl mb-2 md:w-1/3 md:mb-0 font-semibold text-zinc-900">
          Don&apos;t Miss Our Deals
        </h2>
        <p className="text-zinc-500 md:w-2/3 text-sm tracking-wider">
          Get the best value for your money with our exclusive discount offers.
          We're committed to providing high-quality products at unbeatable
          prices.
        </p>
      </div>
      <div className="container">
        {isLoading && <DiscountOffersLoader />}
        {isError && <ServerDownError refetch={refetch} />}
        {!isLoading && !isError && offers && (
          <DiscountOffersList now={now} offers={offers} />
        )}
      </div>
    </div>
  );
};

export default DiscountOffers;
