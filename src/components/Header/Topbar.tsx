import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Topbar() {
  return (
    <div className="bg-black hidden md:flex text-[13px] text-medium justify-between text-gray-300 items-center h-9 px-4">
      <ul className="flex gap-3">
        <li>
          <a href="">About Us</a>
        </li>
        <li>
          <Link to="/profile">My account</Link>
        </li>
        <li>
          <Link to="/my-wishlist">Wishlist</Link>
        </li>
        <li>
          <a href="">Order Tracking</a>
        </li>
      </ul>

      <p className=" ">100% Secure delivery without contacting the courier</p>
      <ul className="flex gap-2  align-items-center">
        <li className="group relative flex items-center">
          <span className="mr-1">English</span> <IoIosArrowDown />
        </li>
        <li className="flex items-center">
          <span className="mr-1">USD</span> <IoIosArrowDown />
        </li>
      </ul>
    </div>
  );
}
