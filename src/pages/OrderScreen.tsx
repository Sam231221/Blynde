import React, { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { FaRegCircleCheck } from "react-icons/fa6";
import Loader from "../components/Loader";
import { Message } from "../components/Message";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../redux/actions/orderActions";

import {
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
} from "../redux/reducers/Order/OrderPaySlice";
import Moment from "moment";

import PageContainer from "../components/PageContainer";

const items = [
  { label: "Home", path: "/" },
  { label: "Order", path: "/order" },
];
export default function OrderScreen() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const redirect = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let finalOrder = {};
  if (!loading && !error) {
    finalOrder = {
      ...order,
      itemsPrice: order.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2),
    };
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUpg7Hgv4nw9CDxWQjKj8AJF4bUTShD8dYs1zXAdLI8HgtQNZ9RuHpOtWfhdfcBrcZVrngZzf9MiRvDG&disable-funding=credit";
    script.async = true;

    setSdkReady(true);

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!userInfo) {
      redirect("/login");
    }
    if (!order || successPay || order._id !== id || successDeliver) {
      dispatch(ORDER_PAY_RESET());
      // dispatch(ORDER_DELIVERY_RESET())
      dispatch(getOrderDetails(id));
    } //if order is not paid yet
    else if (!order.isPaid) {
      //if no paypal has been added yet
      addPayPalScript();
    }
  }, [dispatch, id]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
    alert("Payment Completed!");
    window.location.reload();
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    alert("Order Delivery Completed!");
    window.location.reload();
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
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
        <div className="mt-3 flex  flex-col gap-2 md:flex-row">
          <div className="md:flex-1  bg-zinc-50 border p-4">
            <h1 className="font-medium text-lg border-b mb-2 pb-2">
              Order Details
            </h1>
            <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
              Order No: {order._id}
            </h1>
            <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
              Issued on :{" "}
              {Moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}
            </h1>
            <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
              Total: ${finalOrder.totalPrice}
            </h1>
            <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
              Payment Method : {order.paymentMethod}
            </h1>
          </div>
          <div className="md:w-1/4 bg-zinc-50 border p-4">
            <h1 className="font-medium text-lg border-b mb-2 pb-2">
              Payment Options
            </h1>
            {order.isPaid ? (
              <Message variant="success">
                Paid on {Moment(order.paidAt).format("MMMM Do YYYY, h:mm a")}
              </Message>
            ) : (
              <Message variant="alert">Not Paid</Message>
            )}
            {!order.isPaid && (
              <div>
                <PayPalButton
                  amount={order.totalPrice}
                  onSuccess={successPaymentHandler}
                />
              </div>
            )}
          </div>
          <div className="md:w-1/6 border bg-zinc-50 p-4">
            <h1 className="font-medium text-lg border-b mb-2 pb-2">Status</h1>
            {loadingDeliver && <Loader />}

            {order.isDelivered ? (
              <Message variant="success">
                Delivered on{" "}
                {Moment(order.deliveredAt).format("MMMM Do YYYY, h:mm a")}
              </Message>
            ) : (
              <Message variant={"alert"}>Not Delivered</Message>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <div className="mb-3 ms-2">
                  <button
                    type="button"
                    className="text-white bg-sky-500 hover:bg-sky-600 px-5 text-xs font-medium py-2"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </button>
                </div>
              )}
          </div>
        </div>
        <table className="table flex-1 md:flex-[3_1_0%] border w-full mt-4 mb-2">
          <thead className="bg-secondaryBgColor ">
            <tr className="uppercase text-zinc-700">
              <th className="p-2 border-r text-sm font-semibold tracking-wide text-left">
                Product
              </th>
              <th className="p-2 text-sm font-semibold tracking-wide text-left">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b ">
              <td className="p-2 border-r text-sm text-gray-700">
                <ol>
                  {order.orderItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <div>
                        <Link
                          className="nav-links link-dark"
                          to={`/product/${item.product}`}
                        >
                          {item.name} x {item.qty}
                        </Link>
                      </div>
                    </li>
                  ))}
                </ol>
              </td>
              <td className="p-2  text-sm text-gray-700">
                <ol>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>${(item.qty * item.price).toFixed(2)}</li>
                  ))}
                </ol>
              </td>
            </tr>

            <tr className="border-b ">
              <td className="p-2 border-r text-sm text-gray-700">Subtotal:</td>
              <td className="p-2  text-sm text-gray-700">
                ${finalOrder.itemsPrice}
              </td>
            </tr>

            <tr className="border-b ">
              <td className="p-2 border-r  text-sm text-gray-700">Shipping:</td>
              <td className="p-2  text-sm text-gray-700">
                ${order.shippingPrice}
              </td>
            </tr>

            <tr className="border-b ">
              <td className="p-2 border-r text-sm text-gray-700">
                Payment Method:
              </td>
              <td className="p-2  text-sm text-gray-700">
                {order.paymentMethod}
              </td>
            </tr>

            <tr className="border-b ">
              <td className="p-2 border-r text-sm text-gray-700">Tax:</td>
              <td className="p-2  text-sm text-gray-700">${order.taxPrice}</td>
            </tr>

            <tr className="border-b ">
              <td className="p-2  text-sm text-gray-700">Total:</td>
              <td className="p-2  text-sm text-gray-700">
                ${order.totalPrice}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="bg-zinc-50 border p-4 mb-3 sm:w-2/6">
          <h1 className="font-medium text-lg border-b mb-2 pb-2">
            Shipping Address
          </h1>
          <p className="text-sm text-gray-700 my-1">
            <label className=" font-medium mr-3" htmlFor="">
              Name:
            </label>
            <span>{order.user.name}</span>
          </p>
          <p className="text-sm text-gray-700 my-1">
            <label className=" font-medium mr-3" htmlFor="">
              Email:
            </label>
            <span>{order.user.email}</span>
          </p>
          <p className="text-sm text-gray-700 my-1">
            <label className=" font-medium mr-3" htmlFor="">
              Address:
            </label>
            <span>{order.shippingAddress.address}</span>
          </p>
          <p className="text-sm text-gray-700 my-1">
            <label className=" font-medium mr-3" htmlFor="">
              City:
            </label>
            <span>{order.shippingAddress.city}</span>
          </p>
          <p className="text-sm text-gray-700 my-1">
            <label className=" font-medium mr-3" htmlFor="">
              Postal Code:
            </label>
            <span>{order.shippingAddress.postalCode}</span>
          </p>
          <p className="text-sm text-gray-700 my-1">
            <label className=" font-medium mr-3" htmlFor="">
              Country:
            </label>
            <span>{order.shippingAddress.country}</span>
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
