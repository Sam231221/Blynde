import type React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const PaymentErrorScreen = () => {
  const [search] = useSearchParams();

  const order_number = search.get("order_number");
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-pink-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
      >
        {/* Error X icon */}
        <motion.svg
          className="w-24 h-24 mx-auto mb-6"
          viewBox="0 0 24 24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <motion.path
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            d="M18 6L6 18M6 6l12 12"
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
          Payment Failed
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          We're sorry, but there was an error processing your payment. Please
          try again or contact support.
        </motion.p>

        <motion.div
          className="bg-red-50 rounded-lg p-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-red-600 mb-2">
            <span className="font-semibold">Error Code:</span>{" "}
            ERR_PAYMENT_FAILED
          </p>
          <p className="text-sm text-red-600 mb-2">
            <span className="font-semibold">Transaction ID:</span> #
            {order_number}
          </p>
          <p className="text-sm text-red-600">
            <span className="font-semibold">Date:</span>{" "}
            {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.button
          className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-red-500 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try Again
        </motion.button>

        {/* Decorative elements with scale animations */}
        <DecorativeCircle
          size={80}
          color="red-300"
          position="top-0 left-0"
          delay={0.7}
        />
        <DecorativeCircle
          size={120}
          color="pink-300"
          position="bottom-0 right-0"
          delay={0.8}
        />
        <DecorativeCircle
          size={40}
          color="rose-300"
          position="top-1/2 right-4"
          delay={0.9}
        />
        <DecorativeCircle
          size={60}
          color="red-200"
          position="bottom-1/4 left-4"
          delay={1.0}
        />
        <DecorativeCircle
          size={30}
          color="pink-200"
          position="top-1/4 right-1/4"
          delay={1.1}
        />
      </motion.div>
    </div>
  );
};

interface DecorativeCircleProps {
  size: number;
  color: string;
  position: string;
  delay: number;
}

const DecorativeCircle: React.FC<DecorativeCircleProps> = ({
  size,
  color,
  position,
  delay,
}) => {
  return (
    <motion.div
      className={`absolute ${position} bg-${color} rounded-full opacity-50`}
      style={{ width: size, height: size }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], opacity: 0.5 }}
      transition={{
        delay,
        duration: 0.5,
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
        },
      }}
    />
  );
};

export default PaymentErrorScreen;
