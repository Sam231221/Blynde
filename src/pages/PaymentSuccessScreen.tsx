import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { payOrder } from "../lib/orderApi";
import { toast } from "react-toastify";

interface PaymentData {
  transaction_code?: string;
  transaction_uuid?: string;
  total_amount?: number;
}

const PaymentSuccessScreen: React.FC = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const dataQuery = search.get("data");
  const order_number = search.get("order_number");
  const [data, setData] = useState<PaymentData>({});

  const { mutate: payUserOrder } = useMutation({
    mutationFn: payOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", order_number] });
    },
  });

  useEffect(() => {
    if (order_number) {
      payUserOrder({ orderNumber: order_number });
    } else {
      toast.error("Invalid order id.");
    }
  }, [order_number, payUserOrder]);

  useEffect(() => {
    if (dataQuery) {
      try {
        const decodedData = atob(dataQuery);
        const parsedData: PaymentData = JSON.parse(decodedData);
        setData(parsedData);
      } catch (error) {
        console.error("Failed to parse payment data:", error);
        toast.error("Failed to process payment data.");
      }
    }
  }, [dataQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-green-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
      >
        {/* Success Checkmark */}
        <motion.svg
          className="w-24 h-24 mx-auto mb-6"
          viewBox="0 0 24 24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.path
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            d="M3 12l6 6L21 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </motion.svg>

        <motion.h2
          className="text-3xl font-bold text-center text-gray-800 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Payment Successful!
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank you for your purchase. Your order has been processed
          successfully.
        </motion.p>

        <motion.div
          className="bg-gray-100 rounded-lg p-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {data.transaction_uuid && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Transaction UUID:</span> #
              {data.transaction_uuid}
            </p>
          )}
          {data.transaction_code && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Transaction Code:</span> #
              {data.transaction_code}
            </p>
          )}
          {data.total_amount !== undefined && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Amount Paid:</span> $
              {data.total_amount}
            </p>
          )}
        </motion.div>

        <motion.button
          className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-green-500 hover:to-teal-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/myorders/${order_number}`)}
        >
          Return to Order Details
        </motion.button>

        {/* Decorative Elements */}
        <DecorativeCircle
          size={80}
          color="bg-yellow-300"
          position="top-0 left-0"
          delay={0.7}
        />
        <DecorativeCircle
          size={120}
          color="bg-pink-300"
          position="bottom-0 right-0"
          delay={0.8}
        />
        <DecorativeCircle
          size={40}
          color="bg-blue-300"
          position="top-1/2 right-4"
          delay={0.9}
        />
        <DecorativeCircle
          size={60}
          color="bg-green-300"
          position="bottom-1/4 left-4"
          delay={1.0}
        />
        <DecorativeCircle
          size={30}
          color="bg-purple-300"
          position="top-1/4 right-1/4"
          delay={1.1}
        />
      </motion.div>
    </div>
  );
};

interface DecorativeCircleProps {
  size: number;
  /** Pass a full Tailwind CSS background class (e.g., "bg-yellow-300") */
  color: string;
  position: string;
  delay: number;
}

const DecorativeCircle: React.FC<DecorativeCircleProps> = React.memo(
  ({ size, color, position, delay }) => {
    return (
      <motion.div
        className={`absolute ${position} ${color} rounded-full opacity-50`}
        style={{ width: size, height: size }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: 0.5 }}
        transition={{
          delay,
          duration: 0.5,
          scale: { type: "spring", damping: 5, stiffness: 100 },
        }}
      />
    );
  }
);

export default PaymentSuccessScreen;
