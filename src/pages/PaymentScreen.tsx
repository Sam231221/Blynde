import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";

import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../redux/reducers/CartSlice";
import { useAppSelector } from "../redux/store";
import { selectUser } from "../redux/reducers/AuthSlice";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES } from "../routes/Routes";

const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Order", path: "#" },
  { label: "Shipping", path: ROUTES.ORDER_SHIPPING },
  { label: "Payment", path: "#" },
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
    navigate(ROUTES.ORDER_SHIPPING);
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate(ROUTES.PLACE_ORDER);
  };

  return (
    <div className="container mx-auto py-2 overflow-auto mt-10">
      <BreadCrumbs items={items} />
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
