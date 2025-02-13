import { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { PayPalButton } from "react-paypal-button-v2";
import Moment from "moment";

import Loader from "../components/Loader";
import { Message } from "../components/Message";

import PageContainer from "../components/PageContainer";
import { useUser } from "../hooks/useAuth";
import {
  selectSelectedOrder,
  setSelectedOrder,
} from "../redux/reducers/OrderSlice";
import { deliverOrder, fetchOrderById, payOrder } from "../lib/orderApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { toast } from "react-toastify";

const items = [
  { label: "Home", path: "/" },
  { label: "Order", path: "/order" },
];

export default function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const selectedOrder = useSelector(selectSelectedOrder);
  const userInfo = useUser();

  const [sdkReady, setSdkReady] = useState(false);

  const {
    data: fetchedOrders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrderById(Number(id)),
  });

  useEffect(() => {
    if (fetchedOrders) {
      dispatch(setSelectedOrder(fetchedOrders));
    }
  }, [fetchedOrders, dispatch]);
  let finalOrder: {
    itemsPrice?: string;
    totalPrice?: number;
  } = {};
  if (!isLoading && !error) {
    finalOrder = {
      ...selectedOrder,
      itemsPrice: selectedOrder?.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2),
      totalPrice: selectedOrder?.totalPrice,
    };
  }

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AUpg7Hgv4nw9CDxWQjKj8AJF4bUTShD8dYs1zXAdLI8HgtQNZ9RuHpOtWfhdfcBrcZVrngZzf9MiRvDG&disable-funding=credit";
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.body.appendChild(script);
  };

  const { mutate: deliverUserOrder, isPending: isDelivering } = useMutation({
    mutationFn: deliverOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
  });

  const { mutate: payUserOrder } = useMutation({
    mutationFn: payOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
    onError: () => {
      toast.error("An error occurred");
    },
  });

  const handleUpdateStatus = (orderId: number) => {
    deliverUserOrder({ orderId });
  };

  const successPaymentHandler = () => {
    payUserOrder({ orderId: Number(selectedOrder?._id) });
  };

  useEffect(() => {
    if (!userInfo) {
      redirect("/login");
    }
    if (!selectedOrder?.isPaid && !sdkReady) {
      addPayPalScript();
    }
  }, [userInfo, id, redirect, selectedOrder?.isPaid, sdkReady]);

  if (isLoading) return <Loader />;
  if (error) return <p>An error occurred</p>;

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

        {selectedOrder !== null && (
          <>
            <div className="mt-3 flex flex-col gap-2 md:flex-row">
              <div className="md:flex-1 bg-zinc-50 border p-4">
                <h1 className="font-medium text-lg border-b mb-2 pb-2">
                  Order Details
                </h1>
                <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
                  Order No: {selectedOrder._id}
                </h1>
                <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
                  Issued on:{" "}
                  {Moment(selectedOrder.createdAt).format(
                    "MMMM Do YYYY, h:mm a"
                  )}
                </h1>
                <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
                  Total: ${finalOrder.totalPrice}
                </h1>
                <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
                  Payment Method: {selectedOrder.paymentMethod}
                </h1>
              </div>
              <div className="md:w-1/4 bg-zinc-50 border p-4">
                <h1 className="font-medium text-lg border-b mb-2 pb-2">
                  Payment Options
                </h1>
                {selectedOrder.isPaid ? (
                  <Message variant="success">
                    Paid on{" "}
                    {Moment(selectedOrder.paidAt).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  </Message>
                ) : (
                  <Message variant="alert">Not Paid</Message>
                )}
                {!selectedOrder.isPaid && sdkReady && (
                  <div>
                    <button onClick={successPaymentHandler}>Pay</button>
                    {/* <PayPalButton
                      amount={selectedOrder.totalPrice}
                      onSuccess={successPaymentHandler}
                    /> */}
                  </div>
                )}
              </div>
              <div className="md:w-1/6 border bg-zinc-50 p-4">
                <h1 className="font-medium text-lg border-b mb-2 pb-2">
                  Status
                </h1>
                {isDelivering && <Loader />}
                {selectedOrder.isDelivered ? (
                  <Message variant="success">
                    Delivered on{" "}
                    {Moment(selectedOrder.deliveredAt).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  </Message>
                ) : (
                  <>
                    <Message variant="alert">Not Delivered</Message>
                  </>
                )}
                {/* inlcude userInfo.isAdmin later on && */}
                {userInfo &&
                  selectedOrder.isPaid &&
                  !selectedOrder.isDelivered && (
                    <div className="mb-3 ms-2">
                      <button
                        type="button"
                        className="text-white bg-sky-500 hover:bg-sky-600 px-5 text-xs font-medium py-2"
                        onClick={() =>
                          handleUpdateStatus(Number(selectedOrder._id))
                        }
                      >
                        Mark As Delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>

            <table className="table flex-1 md:flex-[3_1_0%] border w-full mt-4 mb-2">
              <thead className="bg-secondaryBgColor">
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
                <tr className="border-b">
                  <td className="p-2 border-r text-sm text-gray-700">
                    <ol>
                      {selectedOrder?.orderItems.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div>
                            <Link
                              className="nav-links link-dark"
                              to={`/product/${item._id}`}
                            >
                              {item.name} x {item.qty}
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </td>
                  <td className="p-2 text-sm text-gray-700">
                    <ol>
                      {selectedOrder?.orderItems.map((item, index) => (
                        <li key={index}>
                          ${(item.qty * item.price).toFixed(2)}
                        </li>
                      ))}
                    </ol>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 border-r text-sm text-gray-700">
                    Subtotal:
                  </td>
                  <td className="p-2 text-sm text-gray-700">
                    ${finalOrder.itemsPrice}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 border-r text-sm text-gray-700">
                    Shipping:
                  </td>
                  <td className="p-2 text-sm text-gray-700">
                    ${selectedOrder.shippingPrice}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 border-r text-sm text-gray-700">
                    Payment Method:
                  </td>
                  <td className="p-2 text-sm text-gray-700">
                    {selectedOrder.paymentMethod}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 border-r text-sm text-gray-700">Tax:</td>
                  <td className="p-2 text-sm text-gray-700">
                    ${selectedOrder.taxPrice}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-2 text-sm text-gray-700">Total:</td>
                  <td className="p-2 text-sm text-gray-700">
                    ${selectedOrder.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="bg-zinc-50 border p-4 mb-3 sm:w-2/6">
              <h1 className="font-medium text-lg border-b mb-2 pb-2">
                Shipping Address
              </h1>
              <p className="text-sm text-gray-700 my-1">
                <label className="font-medium mr-3">Name:</label>
                <span>{selectedOrder.user.first_name}</span>
              </p>
              <p className="text-sm text-gray-700 my-1">
                <label className="font-medium mr-3">Email:</label>
                <span>{selectedOrder.user.email}</span>
              </p>
              <p className="text-sm text-gray-700 my-1">
                <label className="font-medium mr-3">Address:</label>
                <span>{selectedOrder.shippingAddress.address}</span>
              </p>
              <p className="text-sm text-gray-700 my-1">
                <label className="font-medium mr-3">City:</label>
                <span>{selectedOrder.shippingAddress.city}</span>
              </p>
              <p className="text-sm text-gray-700 my-1">
                <label className="font-medium mr-3">Postal Code:</label>
                <span>{selectedOrder.shippingAddress.postalCode}</span>
              </p>
              <p className="text-sm text-gray-700 my-1">
                <label className="font-medium mr-3">Country:</label>
                <span>{selectedOrder.shippingAddress.country}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
