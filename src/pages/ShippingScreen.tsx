import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../redux/actions/cartAction";
import PageContainer from "../components/PageContainer";
const items = [
  { label: "Home", path: "/" },
  { label: "Shipping", path: "/shipping" },
];

function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*
    Either we load the shipping address for user(user have alread defined) or make it empty
    */
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
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
            {/*
             On Shipping Screen
             there are only 2 steps
             step1: User must be logged in
             step2: User Shipping Address 
            */}
            <h3 className="text-center font-medium tracking-wide text-2xl my-3">
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
    </PageContainer>
  );
}

export default ShippingScreen;
