import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CiBookmark } from "react-icons/ci";
import { Message } from "../components/Message";
import PageContainer from "../components/PageContainer";

import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/reducers/Order/OrderCreateSlice";
import { endpoint } from "../lib/api";
const items = [
  { label: "Home", path: "/" },
  { label: "Shipping", path: "/shipping" },
  { label: "Payment", path: "/payment" },
  { label: "Place Order", path: "/placeorder" },
];
function PlaceOrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  //since cart is not exstensible, we will use spread operator.
  // cconsole.log(Object.isExtensible(cart))
  //FINALIZING AMOUNTS
  let itemsPrice = Number(
    Number(
      cart.cartItems
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(3)
    )
  );
  //You could set shipping price in backend too.
  let shippingPrice = Number(Number(itemsPrice > 100 ? 10 : 0).toFixed(3));
  let taxPrice = Number(Number(0.082 * itemsPrice).toFixed(3));
  let totalPrice = itemsPrice + shippingPrice + taxPrice;

  let FinalCart = {
    ...cart,
    itemsPrice: itemsPrice,
    shippingPrice: shippingPrice,
    taxPrice: taxPrice,
    totalPrice: totalPrice,
  };

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    //In backend order_views.getOrderById
    //a success variable is used to redirect to /order/:id
    if (success) {
      window.location.reload();
      navigate(`/order/${order._id}`);
      dispatch(ORDER_CREATE_RESET());
    }
  }, [success, navigate, dispatch, order._id]);

  //on clicking PlaceOrderButton dispatch createOrder() that will also create Order Instance in backend
  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <PageContainer>
      <div className="container mx-auto py-2 overflow-auto mt-10">
        {/* Breadcrumbs */}
        <nav className="text-xs mt-10" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            {items.map((item, index) => (
              <li className="flex items-center gap-2" key={index}>
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {item.label}
                </Link>
                {index < items.length - 1 && (
                  <span className="text-gray-300">/</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
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
              Add <span className="font-medium text-sky-500">$300</span> to cart
              and get free shipping!
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
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
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
                  <span>{cart.shippingAddress.address}</span>
                </p>
                <p className="text-sm my-1">
                  <label className=" font-medium mr-3" htmlFor="">
                    City:
                  </label>
                  <span>{cart.shippingAddress.city}</span>
                </p>
                <p className="text-sm my-1">
                  <label className=" font-medium mr-3" htmlFor="">
                    Postal Code:
                  </label>
                  <span>{cart.shippingAddress.postalCode}</span>
                </p>
                <p className="text-sm my-1">
                  <label className=" font-medium mr-3" htmlFor="">
                    Country:
                  </label>
                  <span>{cart.shippingAddress.country}</span>
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
          <div className="md:w-1/6">
            <div className="m-3 p-3 border shadow">
              <h1 className="text-lg font-medium">Order Items</h1>
              <hr />
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <>
                  {cart.cartItems.map((item, index) => (
                    <div key={index} className="flex  flex-col">
                      <div className="w-14 h-14">
                        <img
                          className="w-full h-full object-contain"
                          src={`${endpoint}${item.thumbnail}`}
                          alt={item.name}
                        />
                      </div>
                      <div>
                        <Link
                          className="text-xs nav-links link-dark"
                          to={`/product/${item.productId}`}
                        >
                          {item.name} X {item.quantity}
                        </Link>
                      </div>
                      <div className="flex py-1 text-xs">
                        <span>Color:{item.color}</span>,
                        <span className="ml-1">Size:{item.size}</span>
                      </div>
                      <div className="text-xs py-1">
                        {" "}
                        Altogether Cost: $
                        {(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default PlaceOrderScreen;
