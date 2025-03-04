import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";

import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../redux/reducers/CartSlice";
import { useAppSelector } from "../redux/store";
import { selectUser } from "../redux/reducers/AuthSlice";

const items = [
  { label: "Home", path: "/" },
  { label: "Shipping", path: "/shipping" },
  { label: "Payment", path: "/payment" },
];

function PaymentScreen() {
  const user = useAppSelector(selectUser);
  const cart = useAppSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Esewa");
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=payment");
    }
  }, [user, navigate]);
  if (!shippingAddress?.address) {
    navigate("/shipping");
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
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
          <h3 className="text-center font-bold text-gray-800 tracking-wide text-2xl my-3">
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
                  Esewa
                </label>
                <input
                  type="radio"
                  id="esewa"
                  value="Esewa"
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
  );
}

export default PaymentScreen;
