import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import {
  removeProduct,
  useCompareProducts,
} from "../../redux/reducers/CompareProductsSlice";
import { Link } from "react-router-dom";

import { ROUTES } from "../../routes/Routes";
import { useAppDispatch } from "../../redux/store";

export default function ProductCompareToast() {
  const dispatch = useAppDispatch();
  const { products } = useCompareProducts();
  const [isFullVersion, setIsFullVersion] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleRemoveProduct = (productId: string) => {
    dispatch(removeProduct(productId));
    if (products.length <= 1) {
      setIsFullVersion(false);
    }
  };

  const toggleVersion = () => {
    setIsFullVersion((prev) => !prev);
  };

  useEffect(() => {
    if (products.length > 0) {
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
  }, [products]);

  const toastVariants = {
    mini: { height: "48px", width: "148px", bottom: "16px", right: "16px" },
    full: { height: "auto", width: "288px", bottom: "16px", right: "16px" },
  };

  return (
    <>
      <AnimatePresence>
        {products.length > 0 && (
          <motion.div
            initial="mini"
            animate={isFullVersion ? "full" : "mini"}
            variants={toastVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bg-white shadow-lg rounded-lg overflow-hidden z-[997]"
          >
            {isFullVersion ? (
              <div className="w-full h-full flex flex-col">
                <div className="p-3 bg-blue-600 text-white flex justify-between items-center">
                  <h3 className="font-medium">
                    Compare Products ({products.length})
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
                    {products.map((product) => (
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

                {products.length >= 2 && (
                  <div className="p-3 bg-gray-50 border-t">
                    <Link
                      to={ROUTES.COMPARE}
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
