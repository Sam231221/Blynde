import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartAction";
import CheckoutSteps from "../components/CheckoutSteps";

import PageContainer from "../components/PageContainer";
import FormContainer from "../components/FormContainer";

const items = [
  { label: "Home", path: "/" },
  { label: "Shipping", path: "/shipping" },
  { label: "Payment", path: "/payment" },
];

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
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
        <FormContainer>
          <div className="form-signin px-4 py-3 border w-100 m-auto">
            <h3 className="text-center font-medium tracking-wide text-2xl my-3">
              {" "}
              Checkout Process
            </h3>
            <CheckoutSteps step1 step2 step3 />

            <form className="px-16" onSubmit={submitHandler}>
              <div>
                <h1 className=" text-lg font-medium">Select Method</h1>
                <div className="flex gap-2 items-center">
                  <label
                    className="text-sm p-2 font-semibold  text-zinc-700"
                    htmlFor=""
                  >
                    PayPal or Credit Card
                  </label>
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></input>
                </div>
              </div>

              <button
                className="uppercase bg-zinc-800 hover:bg-sky-600 my-4 text-white  font-medium text-sm px-3 py-2"
                type="submit"
              >
                Continue
              </button>
            </form>
          </div>
        </FormContainer>
      </div>
    </PageContainer>
  );
}

export default PaymentScreen;
