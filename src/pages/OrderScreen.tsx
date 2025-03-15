import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Moment from "moment";

import Loader from "../components/Loader";
import { Message } from "../components/Message";

import { EsewaPaymentForm } from "./EsewaPaymentForm";
import { ROUTES } from "../routes/Routes";
import { useOrders } from "../hooks/useOrders";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { useUser } from "../redux/reducers/AuthSlice";

const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Order", path: "#" },
  { label: "Order-Detail", path: "#" },
];

export default function OrderScreen() {
  const { order_number } = useParams();
  const redirect = useNavigate();
  const user = useUser();

  const [sdkReady, setSdkReady] = useState(false);

  const {
    data: selectedOrder,
    isLoading,
    error: fetchOrderError,
  } = useOrders(order_number);
  let finalOrder: {
    itemsPrice?: string;
    totalPrice?: number;
  } = {};
  if (!isLoading && !fetchOrderError) {
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

  useEffect(() => {
    if (!selectedOrder?.isPaid && !sdkReady) {
      addPayPalScript();
    }
  }, [user, order_number, redirect, selectedOrder?.isPaid, sdkReady]);

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto py-2 overflow-auto mt-10">
      {/* Breadcrumbs */}
      <BreadCrumbs items={items} />
      {fetchOrderError && (
        <div className="text-center my-6">
          <Message variant="alert">{fetchOrderError.message}</Message>
        </div>
      )}
      {selectedOrder && (
        <>
          <div className="mt-3 flex flex-col gap-2 md:flex-row">
            <div className="md:flex-1 bg-zinc-50 border p-4">
              <h1 className="font-medium text-lg border-b mb-2 pb-2">
                Order Details
              </h1>
              <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
                Order No: {selectedOrder.order_number}
              </h1>
              <h1 className="text-sm ml-3 mb-2 text-zinc-800 font-medium">
                Issued on:{" "}
                {Moment(selectedOrder.createdAt).format("MMMM Do YYYY, h:mm a")}
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
              {selectedOrder.isPaid && (
                <Message variant="success">
                  Paid on{" "}
                  {Moment(selectedOrder.paidAt).format("MMMM Do YYYY, h:mm a")}
                </Message>
              )}
              {!selectedOrder.isPaid && sdkReady && (
                <div>
                  <EsewaPaymentForm order={selectedOrder} />
                  <div className=" bg-sky-200 p-3 rounded-md mt-2">
                    <h1>
                      {" "}
                      <a
                        className="text-sky-400 hover:text-sky-500"
                        target="__blank"
                        href="https://developer.esewa.com.np/pages/Epay#transactionflow"
                      >
                        Test only, Click here
                      </a>
                    </h1>
                    <span>eSewa ID: 9806800001/2/3/4/5 </span>
                    <span>Password: Nepal@123 MPIN: 1122</span>
                    <span>Token:123456</span>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-1/6 border bg-zinc-50 p-4">
              <h1 className="font-medium text-lg border-b mb-2 pb-2">Status</h1>

              <>
                <Message variant="alert">{selectedOrder.status}</Message>
              </>
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
                          <span>
                            {item.name} x {item.qty}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ol>
                </td>
                <td className="p-2 text-sm text-gray-700">
                  <ol>
                    {selectedOrder?.orderItems.map((item, index) => (
                      <li key={index}>${(item.qty * item.price).toFixed(2)}</li>
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

          <div className="bg-zinc-50 border p-4 mb-3 md:flex-[2_1_0%]">
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
  );
}
