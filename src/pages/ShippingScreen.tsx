import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

import { saveShippingAddress, useCart } from "../redux/reducers/CartSlice";

import { useUser } from "../redux/reducers/AuthSlice";
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTES } from "../routes/Routes";
import { useAppDispatch } from "../types/redux";
const items = [
  { label: "Home", path: ROUTES.HOME },
  { label: "Order", path: "#" },
  { label: "Shipping", path: "#" },
];

function ShippingScreen() {
  const user = useUser();
  const cart = useCart();
  const shippingAddress = cart.shippingAddress || {
    address: "",
    city: "",
    postalCode: "",
    country: "",
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState<string>(shippingAddress.address || "");
  const [city, setCity] = useState<string>(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState<string>(shippingAddress.country || "");
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=shipping");
    }
  }, [user, navigate]);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const shippingAddressId =
      "_id" in shippingAddress ? shippingAddress._id : "";
    dispatch(
      saveShippingAddress({
        _id: shippingAddressId,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate(ROUTES.ORDER_PAYMENT);
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
          <CheckoutSteps step1 step2 />

          <form className="px-16" onSubmit={submitHandler}>
            <h1 className="mb-3 text-lg font-medium">Shipping Details</h1>
            <div>
              <label className="text-sm p-2 font-semibold  text-zinc-800">
                Address
              </label>
              <input
                className="border-b text-xs text-gray-700 bg-none focus:outline-none focus:border-b focus:border-sky-400 py-2 px-2 "
                required
                type="text"
                placeholder="Enter address"
                value={address ? address : ""}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm p-2 font-semibold  text-zinc-800">
                City
              </label>
              <input
                className="border-b text-xs text-gray-700 bg-none focus:outline-none focus:border-b focus:border-sky-400 py-2 px-2 "
                required
                type="text"
                placeholder="Enter city"
                value={city ? city : ""}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm p-2 font-semibold  text-zinc-800">
                Postal Code
              </label>
              <input
                className="border-b text-xs text-gray-700 bg-none focus:outline-none focus:border-b focus:border-sky-400 py-2 px-2 "
                required
                type="text"
                placeholder="Enter postal code"
                value={postalCode ? postalCode : ""}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm p-2 font-semibold  text-zinc-800">
                Country
              </label>
              <input
                className="border-b text-xs text-gray-700 bg-none focus:outline-none focus:border-b focus:border-sky-400 py-2 px-2 "
                required
                type="text"
                placeholder="Enter country"
                value={country ? country : ""}
                onChange={(e) => setCountry(e.target.value)}
              ></input>
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

export default ShippingScreen;
