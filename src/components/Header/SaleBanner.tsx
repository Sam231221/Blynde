import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useDeleteHighestDiscount,
  useHighestPriorityDiscount,
} from "../../hooks/useOffers";

const formatTime = (time: number) => time.toString().padStart(2, "0");

type TimeUnit = {
  value: number;
  label: string;
};

const TimeComponent = ({ unit }: { unit: TimeUnit }) => (
  <div className="flex items-center">
    <div className="flex bg-white px-2 py-1 flex-col items-center rounded-md mx-1">
      <motion.span
        key={unit.value}
        initial={{ opacity: 0.8, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="font-medium text-gray-800 text-sm"
      >
        {formatTime(unit.value)}
      </motion.span>
    </div>
    <span className="text-xs font-medium text-white">{unit.label}</span>
  </div>
);

export default function SaleBanner() {
  const { data: discount, isLoading, error } = useHighestPriorityDiscount();
  const { mutate: deleteDiscount } = useDeleteHighestDiscount();
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (!discount || !discount.end_date) {
      return;
    }

    const endDate = new Date(discount.end_date);

    const updateCountdown = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        deleteDiscount();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft([
        { value: days, label: "D" },
        { value: hours, label: "H" },
        { value: minutes, label: "M" },
        { value: seconds, label: "S" },
      ]);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [discount, deleteDiscount]);

  if (isLoading) return null;
  if (error || !discount) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-[#051818] text-white h-11 px-4"
        >
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">
                  {discount.title || "Sale ends soon!"}
                </span>
                <div className="h-4 w-px bg-gray-400" />
                <span className="text-xs">
                  {discount.description || "Limited time offer!"}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-medium text-xs whitespace-nowrap mr-1">
                  Ends in
                </span>
                <div className="flex">
                  {timeLeft.map((unit, index) => (
                    <React.Fragment key={unit.label}>
                      <TimeComponent unit={unit} />
                      {index < timeLeft.length - 1 && (
                        <span className="text-sm font-medium self-start ml-1 mt-[2px]">
                          :
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setIsVisible(false);
                    deleteDiscount();
                  }}
                  className="p-1 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close banner"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="hover:scale-110 transition-transform"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
