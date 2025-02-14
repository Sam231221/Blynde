import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { AiOutlineDelete } from "react-icons/ai";
import PageContainer from "../components/PageContainer";

import ProductPriceInput from "../components/ProductPriceInput";
import { removeFromCart, updateQuantity } from "../redux/reducers/CartSlice";
import { RootState } from "../types";
const items = [
  { label: "Home", path: "/" },
  { label: "Cart", path: "/cart" },
];

export default function CartScreen() {
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const handleChange = (val: number, _id: string | undefined): void => {
    dispatch(updateQuantity({ qty: val, _id }));
  };
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    redirect("/shipping");
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
        {/* add extra and get free*/}
        <div className="flex flex-col md:flex-row gap-3 mt-10 mb-5">
          <div className="md:flex-1 flex-col">
            <div className="flex flex-col py-4 px-4 border border-gray-200">
              <p className="text-sm">
                Add <span className="font-medium text-sky-500">$300</span> to
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
            <table className="table flex-1 md:flex-[3_1_0%] border w-full mt-4 mb-2">
              <thead className="bg-secondaryBgColor ">
                <tr className="uppercase text-zinc-700">
                  <th className="p-2 text-sm font-semibold tracking-wide text-left">
                    S.N
                  </th>
                  <th className="p-2 text-sm font-semibold tracking-wide text-left">
                    Product
                  </th>
                  <th className="p-2 text-sm font-semibold tracking-wide text-left">
                    Price
                  </th>
                  <th className="p-2 text-sm font-semibold tracking-wide text-left">
                    Quantity
                  </th>
                  <th className="p-2 text-sm font-semibold tracking-wide text-left">
                    Total
                  </th>
                  <th className="p-2 text-sm font-semibold tracking-wide text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((cartItem, i) => (
                      <tr className="border-b " key={i + 1}>
                        <td className="p-2 text-center text-sm text-gray-700">
                          <a
                            className="text-primaryTextColor hover:text-secondaryTextColor"
                            href="#"
                          >
                            {i + 1}
                          </a>
                        </td>
                        <td className="p-2 border-b-0 text-sm  text-gray-700">
                          <img
                            src={cartItem.thumbnail}
                            className="w-12 inline h-12 object-contain"
                          />
                          <span>{cartItem.name}</span>
                        </td>

                        <td className="p-2   text-sm text-gray-700">
                          ${cartItem.price}
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          <ProductPriceInput
                            id={cartItem.productId}
                            qty={cartItem.qty}
                            handleChange={handleChange}
                          />
                        </td>
                        <td className="p-2 text-sm text-gray-700">
                          ${(cartItem.qty * cartItem.price).toFixed(2)}
                        </td>
                        <td className="p-2 text-xs text-center">
                          <AiOutlineDelete
                            onClick={() =>
                              removeFromCartHandler(cartItem.productId)
                            }
                            className="text-red-500 cursor-pointer"
                            size={20}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <p className="text-xs p-3">Your Cart is Empty</p>
                )}
              </tbody>
            </table>
          </div>
          <div className="md:w-1/4 border  mb-2  px-5 py-3">
            <h1 className="text-xl py-2 border-b border-gray-200 uppercase">
              Cart Totals
            </h1>
            {/* Calculate indiviual total price, cart total */}
            <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-3">
              <span> Total Items:</span>
              <span>
                {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
              </span>
            </div>
            <div className="flex border-b py-2 border-gray-200 justify-between text-sm my-3">
              <span> Subtotal:</span>
              <span>
                $
                {cartItems
                  .reduce(
                    (accumulator, item) => accumulator + item.qty * item.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            <div>
              <button
                type="button"
                className="w-full uppercase bg-zinc-800 hover:bg-sky-600 text-white font-medium text-xs px-5 py-4 my-6"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
