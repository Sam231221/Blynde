import { Link, useNavigate } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../types";

interface CartRightBarProps {
  sideCartNav: boolean;
  setSideCartNav: (value: boolean) => void;
}

export default function CartRightBar({
  sideCartNav,
  setSideCartNav,
}: CartRightBarProps) {
  const redirect = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  const checkoutHandler = () => {
    redirect("/login?redirect=shipping");
  };

  const showSideCartNav = () => {
    setSideCartNav(!sideCartNav);
  };
  return (
    <>
      <div
        id="CartRightBar"
        className={`${
          sideCartNav ? "visible " : "invisible"
        } transition-all duration-800 ease-in absolute w-full h-full bg-black/10 backdrop-blur-sm z-[998] top-0 left-0`}
      ></div>
      <div
        className={`w-80 h-full px-5 py-2 z-[999] bg-white fixed  top-0  transition-all duration-800 ease-in ${
          sideCartNav ? "visible right-0" : "invisible -right-[300px]"
        } `}
      >
        <div className="flex mb-3 items-center justify-between text-zinc-800">
          <h1 className="text-2xl tracking-wide font-bold uppercase">
            Your cart
          </h1>
          <HiOutlineXMark
            onClick={() => showSideCartNav()}
            className="cursor-pointer hover:text-sky-600"
            size={30}
          />
        </div>

        <div className="h-[55vh] max-h-[55vh] overflow-y-auto">
          {cartItems.map((item, i) => (
            <div key={i} className="flex mb-3 cursor-pointer  items-center">
              <div className="w-16 h-16 mr-3">
                <img
                  src={item.thumbnail}
                  className="w-full h-full object-cover"
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm text-zinc-800 font-medium">
                  {item.name}
                </h1>
                <p className="text-xs text-zinc-400">
                  {item.quantity} x ${item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col mt-5">
          <h1 className="text-sm mb-3 mt-5 text-zinc-800 font-medium">
            Total:$
            {cartItems
              .reduce(
                (accumulator, item) => accumulator + item.quantity * item.price,
                0
              )
              .toFixed(2)}
          </h1>
          <div className="flex gap-3">
            <Link
              to="/cart/"
              className="rounded-full uppercase hover:bg-sky-600 bg-zinc-900 text-white  font-medium text-sm px-3 py-2"
            >
              View Cart
            </Link>
            <button
              onClick={checkoutHandler}
              className="rounded-full uppercase hover:bg-sky-600 bg-zinc-900 text-white  font-medium text-sm px-3 py-2"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
