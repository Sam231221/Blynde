import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { RiUserReceived2Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa6";

import CartRightBar from "./CartRightBar";
import { ProfileDropDown } from "./ProfileDropDown";
import Searchbar from "./Searchbar";
import { useUser } from "../../hooks/useAuth";
import { RootState } from "../../types";
import { useUserWishlist } from "../../hooks/useWishlist";
import MobileSideHeader from "./MobileSideHeader";
function Header() {
  const [sideCartNav, setSideCartNav] = useState(false);
  const [sideMobileHeader, setSideMobileHeader] = useState(false);
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  const { data } = useUserWishlist();
  const userInfo = useUser();

  const location = useLocation();

  const [navbar, setNavbar] = useState(false);

  const toggleSideMobileHeader = () => {
    setSideMobileHeader(!sideMobileHeader);
  };
  const showSideCartNav = () => {
    setSideCartNav(!sideCartNav);
  };

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <>
      <header
        className={clsx(
          "z-[997] md:pt-3 sm:pb-3 h-16 fixed transition-all duration-500 w-full flex items-center",
          navbar
            ? "justify-between top-0 md:top-0 right-0 left-0 bg-white drop-shadow-lg"
            : "bg-transparent top-22 md:top-11"
        )}
      >
        <div className="flex justify-between w-full h-full items-center">
          <div className="w-full h-full px-4 flex items-center  ">
            <div className="flex items-center ">
              <RxHamburgerMenu
                onClick={() => toggleSideMobileHeader()}
                className="text-[20px] md:text-[25px] mr-3 block md:hidden"
              />
              <Link to="/">
                <h2 className="text-3xl  mb-2 font-bold tracking-wide text-zinc-900">
                  Blynde
                </h2>
              </Link>
            </div>

            <nav className="ml-10 hidden md:block">
              <ul className="me-lg-5 text-sm flex items-center font-semibold gap-3">
                <li>
                  <Link
                    to="/"
                    className={
                      splitLocation[1] === ""
                        ? "nav-link text-blue scrollto "
                        : "nav-link scrollto"
                    }
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      splitLocation[1] === "shop"
                        ? "nav-link text-blue scrollto "
                        : "nav-link scrollto"
                    }
                    to="/shop"
                  >
                    Shop
                  </Link>
                </li>

                <li>
                  <Link
                    className={
                      splitLocation[1] === "about-us"
                        ? "nav-link active scrollto "
                        : "nav-link scrollto"
                    }
                    to="/about-us/"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      splitLocation[1] === "contact-us"
                        ? "nav-link active scrollto "
                        : "nav-link scrollto"
                    }
                    to="/contact-us/"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="ml-4">
              <Searchbar />
            </div>
          </div>
          {/* lefmost navitems */}
          <div className="flex px-4 mr-5 items-center gap-3">
            {userInfo ? (
              <ProfileDropDown />
            ) : (
              <Link to="/login">
                <RiUserReceived2Line className="text-[15px] md:text-[20px]" />
              </Link>
            )}

            <div
              onClick={() => showSideCartNav()}
              className="relative cursor-pointer"
            >
              <FaCartShopping className="text-[15px] md:text-[20px]" />
              <div className="absolute  aspect-square -top-3 -right-3 w-4 h-4 flex items-center justify-center text-white text-[12px] font-medium bg-[#717FE0]">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </div>
            </div>
            {userInfo && (
              <Link to="/my-wishlist" className="relative cursor-pointer">
                <FaRegHeart className="text-[15px] md:text-[20px]" />

                <div className="absolute  aspect-square -top-3 -right-3 w-4 h-4 flex items-center justify-center text-white text-[12px] font-medium bg-[#717FE0]">
                  {data?.count}
                </div>
              </Link>
            )}
          </div>
        </div>
      </header>
      <MobileSideHeader
        sideMobileHeader={sideMobileHeader}
        setSideMobileHeader={toggleSideMobileHeader}
      />
      <CartRightBar sideCartNav={sideCartNav} setSideCartNav={setSideCartNav} />
    </>
  );
}

export default Header;
