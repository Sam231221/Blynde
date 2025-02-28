import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, X } from "lucide-react";

interface CouponInputProps {
  onApply: (coupon: string) => void;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  data: { message: string } | null;
  onCouponChange?: (coupon: string) => void;
  placeholder?: string;
}

export default function CouponInput({
  onApply,
  isLoading,
  isError,
  error,
  data,
  onCouponChange,
  placeholder = "Enter coupon code",
}: CouponInputProps) {
  const [coupon, setCoupon] = useState("");
  const [copied, setCopied] = useState(false);

  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (isLoading) {
      setStatus("loading");
    } else if (isError) {
      setStatus("error");
    } else if (data) {
      setStatus("success");
    } else {
      setStatus("idle");
    }
  }, [isLoading, isError, data]);

  const handleApply = () => {
    if (!coupon.trim()) return;
    onApply(coupon);
    setTimeout(() => {
      setCoupon("");
      setStatus("idle");
    }, 2000);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(coupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setCoupon("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCoupon(value);
    if (onCouponChange) {
      onCouponChange(value);
    }
  };

  const message = isError
    ? error?.message || "An error occurred"
    : data?.message || "Coupon applied successfully!";

  return (
    <div className="w-full my-2 mx-auto">
      <div className="relative">
        <motion.div
          className={`
            relative overflow-hidden rounded-lg shadow-sm border 
            ${status === "error" ? "border-red-300" : "border-gray-300"}
            ${status === "success" ? "border-green-300" : ""}
            focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
            transition-all duration-200
          `}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <input
              type="text"
              value={coupon}
              onChange={handleInputChange}
              placeholder={placeholder}
              className="w-full px-4 py-3 text-gray-700 bg-white outline-none"
              disabled={isLoading}
              aria-label="Coupon code input"
            />

            <AnimatePresence>
              {coupon && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={handleClear}
                  aria-label="Clear input"
                >
                  <X size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {coupon && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={handleCopy}
                  aria-label="Copy coupon"
                >
                  {copied ? (
                    <Check size={18} className="text-green-500" />
                  ) : (
                    <Copy size={18} />
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-green-50 px-4 py-2 text-sm text-green-700"
              >
                {message}
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-red-50 px-4 py-2 text-sm text-red-700"
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.button
          onClick={handleApply}
          disabled={!coupon.trim() || isLoading}
          className={`
            mt-3 w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white 
            rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${
              !coupon.trim() || isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }
            transition-all duration-200
          `}
          whileHover={{ scale: coupon.trim() && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: coupon.trim() && !isLoading ? 0.98 : 1 }}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1,
                ease: "linear",
              }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            "Apply Coupon"
          )}
        </motion.button>
      </div>
    </div>
  );
}
