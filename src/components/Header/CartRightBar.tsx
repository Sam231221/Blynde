import { Link, useNavigate } from "react-router-dom";
import { HiOutlineXMark, HiOutlineShoppingBag } from "react-icons/hi2";

import { motion, AnimatePresence } from "framer-motion";

import {
  removeFromCart,
  selectCartTotal,
  useCart,
} from "../../redux/reducers/CartSlice";
import { ROUTES } from "../../routes/Routes";
import { useAppDispatch, useAppSelector } from "../../redux/store";

interface CartRightBarProps {
  sideCartNav: boolean;
  setSideCartNav: (value: boolean) => void;
}

export default function CartRightBar({
  sideCartNav,
  setSideCartNav,
}: CartRightBarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartItems } = useCart();

  const totalAmount = useAppSelector(selectCartTotal);

  const checkoutHandler = () => {
    navigate(ROUTES.ORDER_SHIPPING);
  };

  const showSideCartNav = () => {
    setSideCartNav(!sideCartNav);
  };

  return (
    <>
      <AnimatePresence>
        {sideCartNav && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998]"
            onClick={() => setSideCartNav(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: sideCartNav ? 0 : "100%" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="fixed top-0 right-0 h-full z-[999] w-full max-w-sm bg-gradient-to-b from-white to-gray-50 shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 border-b border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HiOutlineShoppingBag className="text-sky-600" size={28} />
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                  Your Cart
                </h1>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={showSideCartNav}
                className="rounded-full p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 transition-colors"
              >
                <HiOutlineXMark size={24} />
              </motion.button>
            </div>
          </motion.div>

          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 overflow-y-auto py-4 px-6"
          >
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  <HiOutlineShoppingBag
                    className="mx-auto text-gray-300"
                    size={64}
                  />
                  <p className="mt-4 text-gray-500 font-medium">
                    Your cart is empty
                  </p>
                  <button
                    onClick={() => setSideCartNav(false)}
                    className="mt-4 text-sky-600 font-medium hover:text-sky-700"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              </div>
            ) : (
              <AnimatePresence>
                {cartItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{
                      delay: 0.1 * i,
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    className="flex items-start gap-4 p-4 mb-3 shadow-sm rounded-lg bg-gray-50 transition-colors"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0"
                    >
                      <img
                        src={item.thumbnailUrl}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    </motion.div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-gray-800">{item.name}</p>
                      {item.variations.map((variant, j) => (
                        <div
                          key={j}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
                        >
                          <div className="text-gray-600">
                            {variant.color !== "" && variant.size !== "" && (
                              <>
                                <span
                                  className="inline-block w-3 h-3 rounded-full mr-1"
                                  style={{ backgroundColor: variant.color }}
                                ></span>
                                {variant.color}, Size: {variant.size}
                              </>
                            )}
                            <span className="font-medium ml-1">
                              ({variant.qty} × ${item.price})
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              dispatch(
                                removeFromCart({
                                  productId: item.productId,
                                  color: variant.color,
                                  size: variant.size,
                                })
                              );
                            }}
                            className="text-xs px-2 py-1 rounded bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                          >
                            Remove
                          </motion.button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500">Subtotal</span>
              <motion.span
                key={totalAmount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xl font-bold text-gray-800"
              >
                ${totalAmount}
              </motion.span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={ROUTES.CART}
                  className="flex justify-center items-center h-12 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
                >
                  View Cart
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={checkoutHandler}
                className="h-12 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-blue-500/20 transition-all"
              >
                Checkout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
