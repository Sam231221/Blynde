import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { RootState } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../redux/reducers/CompareProductsSlice";
import { Link } from "react-router-dom";

export default function ProductCompareToast() {
  const dispatch = useDispatch();
  const { products: compareProducts } = useSelector(
    (state: RootState) => state.comparelist
  );
  const [isFullVersion, setIsFullVersion] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
    if (compareProducts.length <= 1) {
      setIsFullVersion(false);
    }
  };

  const toggleVersion = () => {
    setIsFullVersion((prev) => !prev);
  };

  useEffect(() => {
    if (compareProducts.length > 0) {
      setIsFullVersion(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        setIsFullVersion(false);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [compareProducts]);

  const toastVariants = {
    mini: { height: "48px", width: "148px", bottom: "16px", right: "16px" },
    full: { height: "auto", width: "288px", bottom: "16px", right: "16px" },
  };

  return (
    <>
      <AnimatePresence>
        {compareProducts.length > 0 && (
          <motion.div
            initial="mini"
            animate={isFullVersion ? "full" : "mini"}
            variants={toastVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bg-white shadow-lg rounded-lg overflow-hidden z-50 border"
          >
            {isFullVersion ? (
              <div className="w-full h-full flex flex-col">
                <div className="p-3 bg-blue-600 text-white flex justify-between items-center">
                  <h3 className="font-medium">
                    Compare Products ({compareProducts.length})
                  </h3>
                  <button
                    onClick={toggleVersion}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    <ChevronDown size={18} />
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto flex-grow">
                  <AnimatePresence>
                    {compareProducts.map((product) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b last:border-b-0"
                      >
                        <div className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={product.thumbnail_url || "/placeholder.svg"}
                              alt={product.name}
                              className="w-10 h-10 object-cover mr-2 rounded"
                            />
                            <div>
                              <p className="font-medium text-sm">
                                {product.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                ${product.price}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveProduct(product._id)}
                            className="text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {compareProducts.length >= 2 && (
                  <div className="p-3 bg-gray-50 border-t">
                    <Link
                      to="/compare"
                      className="w-full block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Compare Now
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={toggleVersion}
                className="w-full h-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <ChevronUp size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
