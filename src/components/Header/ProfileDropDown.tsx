import React, { useEffect, useRef, useState } from "react";
import profile from "/images/profile.png";
import { RxTriangleDown } from "react-icons/rx";
import { BsBoxArrowRight, BsGear, BsPerson } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLogout, useUser } from "../../hooks/useAuth";
// import { logout } from "../../redux/reducers/AuthSlice2";
export const ProfileDropDown = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  let ProfileDivRef = useRef();
  // const { userInfo } = useSelector((state: RootState) => state.auth);
  const userInfo = useUser();
  const logout = useLogout();
  useEffect(() => {
    let handler = (e) => {
      if (!ProfileDivRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={`relative ${classes}`}>
      <div
        className="flex cursor-pointer items-center relative"
        ref={ProfileDivRef}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img
          src={profile}
          className="rounded-full w-8 h-8 object-cover"
          alt="userprofile"
        />

        <RxTriangleDown className="text-gray-700" size={40} />
      </div>

      <div
        className={` ${
          open ? "visible opacity-100" : "invisible opacity-0"
        } absolute transition-opacity duration-500 ease-out before:content-[""] before:border-l-[#f4f4f4] before:border-t-[#f4f4f4] before:border-bg-[#fff]  before:border-t-[1px] 
                            before:border-l-[1px] before:absolute before:top-[-10px] before:right-5 before:h-5 before:w-5
                            before:bg-[#fff] before:rotate-[45deg] border
                           top-14 right-[2px] border-[#f4f4f4] bg-[#fff] drop-shadow-lg w-[220px] p-2`}
      >
        <div className="ml-4 mb-2">
          <h2 className="text-md capitalize">{userInfo.name}</h2>
        </div>
        <hr />
        <ul>
          <li>
            <Link
              className="px-3 py-2 bg-none hover:bg-[#eef2fa] transition-all duration-500 ease-out flex items-center gap-2 text-xs"
              to="/profile"
            >
              <BsPerson /> My profile
            </Link>
          </li>
          <li>
            <a
              className="px-3 py-2 bg-none hover:bg-[#eef2fa] transition-all duration-500 ease-out flex items-center gap-2 text-xs"
              href=""
            >
              <BsGear /> Acccount Setting
            </a>
          </li>

          <li>
            <div
              onClick={logout}
              className="px-3 py-2 cursor-pointer bg-none hover:bg-[#eef2fa] transition-all duration-500 ease-out flex items-center gap-2 text-xs"
            >
              {" "}
              <BsBoxArrowRight /> Sign Out
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
