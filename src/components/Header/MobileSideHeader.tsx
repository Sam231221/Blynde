import { Link, useLocation } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import clsx from "clsx";

interface CartRightBarProps {
  sideMobileHeader: boolean;
  setSideMobileHeader: (value: boolean) => void;
}

export default function MobileSideHeader({
  sideMobileHeader,
  setSideMobileHeader,
}: CartRightBarProps) {
  const location = useLocation();

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const toggleMobileSideHeader = () => {
    setSideMobileHeader(!sideMobileHeader);
  };
  return (
    <>
      <div
        id="CartRightBar"
        className={`${
          sideMobileHeader ? "visible " : "invisible"
        } transition-all duration-800 ease-in absolute w-full h-full bg-black/10 backdrop-blur-sm z-[998] top-0 left-0`}
      ></div>
      <div
        className={`w-80 h-full px-5 py-2 z-[999] bg-white fixed  top-0  transition-all duration-800 ease-in ${
          sideMobileHeader ? "visible right-0" : "invisible -right-[300px]"
        } `}
      >
        <div className="flex mb-3 items-center justify-between text-zinc-800">
          <h1 className="text-2xl tracking-wide font-bold uppercase">Blynde</h1>
          <HiOutlineXMark
            onClick={() => toggleMobileSideHeader()}
            className="cursor-pointer hover:text-sky-600"
            size={30}
          />
        </div>
        <nav className="">
          <ul className="me-lg-5 text-sm flex flex-col items-center font-semibold gap-3">
            <Link
              to="/"
              className={clsx(
                "w-full py-1 hover:bg-slate-200 ",
                splitLocation[1] === ""
                  ? "nav-link text-blue scrollto "
                  : "nav-link scrollto"
              )}
            >
              <li className="text-lg text-center font-semibold text-zinc-800">
                Home
              </li>
            </Link>
            <Link
              to="/shop"
              className={clsx(
                "w-full py-1 hover:bg-slate-200 ",
                splitLocation[1] === "shop"
                  ? "nav-link text-blue scrollto "
                  : "nav-link scrollto"
              )}
            >
              <li className="text-lg text-center font-semibold text-zinc-800">
                Shop
              </li>
            </Link>

            <Link
              to="/about-us"
              className={clsx(
                "w-full py-1 hover:bg-slate-200 ",
                splitLocation[1] === "about-us"
                  ? "nav-link text-blue scrollto "
                  : "nav-link scrollto"
              )}
            >
              <li className="text-lg text-center font-semibold text-zinc-800">
                About Us
              </li>
            </Link>
          </ul>
        </nav>
        <div className="h-[55vh] max-h-[55vh] overflow-y-auto"></div>

        <div className="flex flex-col mt-5"></div>
      </div>
    </>
  );
}
