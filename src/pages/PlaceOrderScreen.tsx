import { useNavigate } from "react-router-dom";
import { CiBookmark } from "react-icons/ci";
import { Message } from "../components/Message";
import { selectCartTotal, useCart } from "../redux/reducers/CartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { ROUTES } from "../routes/Routes";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { useAppSelector } from "../redux/store";
import { usePlaceUserOrder } from "../hooks/useOrders";
const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Order", path: "#" },
  { label: "Shipping", path: ROUTES.ORDER_SHIPPING },
  { label: "Payment", path: ROUTES.ORDER_SHIPPING },
  { label: "Place Order", path: "#" },
];

function PlaceOrderScreen() {
  const cart = useCart();
  const totalCartItems = useAppSelector(selectCartTotal);
  const navigate = useNavigate();

  const itemsPrice: number = totalCartItems;
  const shippingPrice: number = Number(
    Number(itemsPrice > 100 ? 10 : 0).toFixed(2)
  );
  const taxPrice: number = Number(Number(0.082 * itemsPrice).toFixed(2));
  const totalPrice: number = itemsPrice + shippingPrice + taxPrice;

  const FinalCart = {
    ...cart,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice.toFixed(2),
  };

  if (!cart.paymentMethod) {
    navigate(ROUTES.ORDER_PAYMENT);
  }

  const { mutate: placeOrder, isError: error } = usePlaceUserOrder();

  const handlePlaceOrder = (): void => {
    if (cart.cartItems.length === 0) {
      toast.error("Your cart is empty");
    } else {
      if (cart.shippingAddress && cart.paymentMethod) {
        placeOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        });
      } else {
        alert("Shipping address nd Payment method is missing");
      }
    }
  };
  return (
    <div className="container mx-auto py-2 overflow-auto mt-10">
      <BreadCrumbs items={items} />
      <div className="p-3 mt-2 ">
        <div className="flex flex-col py-4 px-4 bg-gray-100  border border-gray-200">
          <div className="text-sm flex items-center">
            <CiBookmark className="mr-2 text-sky-500" size={15} />
            <span className="font-medium tracking-wide">
              {" "}
              Have a coupon? Click here to enter your code
            </span>
          </div>
        </div>
      </div>
      {/* add extra and get free*/}
      <div className="p-3">
        <div className="flex flex-col py-4 px-5  border border-gray-200">
          <p className="text-sm">
            Add <span className="font-medium text-sky-500">up to $100</span> to
            cart and get free shipping!
          </p>
          <div className="relative mb-3">
            <div
              className="absolute top-[9px] z-[3] left-0 h-2 bg-blue-500 rounded-lg"
              style={{ width: `20%` }}
            ></div>
            <div
              className="absolute top-[9px] z-[2] left-0 h-2 bg-gray-200 rounded-lg"
              style={{ width: `100%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-5 mb-5">
        {/* Order Summary */}
        <div className="md:w-1/4 ">
          <div className="m-3 p-3 border shadow">
            <h1 className="text-xl font-medium py-2 border-b border-gray-200 uppercase">
              Order Summary
            </h1>
            <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-1">
              <span className="font-medium"> Total Items:</span>
              <span>${FinalCart.itemsPrice}</span>
            </div>
            <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-1">
              <span className="font-medium"> Shipping:</span>
              <span>${FinalCart.shippingPrice}</span>
            </div>
            <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-1">
              <span className="font-medium"> Tax:</span>
              <span>${FinalCart.taxPrice}</span>
            </div>
            <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-1">
              <span className="font-medium"> Grand Total:</span>
              <span>${FinalCart.totalPrice}</span>
            </div>
            <div>{error && <Message variant="danger">{error}</Message>}</div>

            <div>
              <button
                type="button"
                className="uppercase bg-zinc-800 hover:bg-sky-600 my-4 text-white  font-medium text-sm px-3 py-2"
                disabled={cart.cartItems.length === 0}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>

        <div className="md:flex-1 flex-col">
          <div className="m-3 p-3 border shadow">
            <div>
              <h1 className="text-xl font-medium py-2 border-b border-gray-200 uppercase">
                Shipping Details
              </h1>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Address:
                </label>
                <span>{cart.shippingAddress?.address}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  City:
                </label>
                <span>{cart.shippingAddress?.city}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Postal Code:
                </label>
                <span>{cart.shippingAddress?.postalCode}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Country:
                </label>
                <span>{cart.shippingAddress?.country}</span>
              </p>
              <p className="text-sm my-1">
                <label className=" font-medium mr-3" htmlFor="">
                  Method:
                </label>
                <span>{cart.paymentMethod}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="md:w-1/3">
          <div className="m-3 p-3 border shadow">
            <h1 className="text-lg font-medium">Order Items</h1>
            <hr />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 overflow-y-auto py-4 px-6"
            >
              {cart.cartItems.length === 0 ? (
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
                      onClick={() => navigate("/shop")}
                      className="mt-4 text-sky-600 font-medium hover:text-sky-700"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.cartItems.map((item, i) => (
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
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
