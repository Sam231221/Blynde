import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { RootState, AppDispatch } from "../../types";
import { useRegister } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { mutate: register, isPending } = useRegister();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      register(
        { name, email, password },
        {
          onSuccess: () => {
            navigate("/login");
            toast.success("You have successfully created an Account!");
          }, // Redirect on success
          onError: (err) => {
            console.error("Registration error (in component):", err);
            if (err && err.data && err.data.message) {
              toast.error(err.data.message);
            } else if (err.message) {
              toast.error(err.message); // Display a more general error message
            } else {
              toast.error("An error occurred during registration.");
            }
          },
        }
      );
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="pb-10 pt-10 flex  h-screen">
      <div className="form-signin shadow  w-[300px] sm:w-[500px] m-auto px-10">
        <h3 className="mb-2 font-bold text-2xl text-center">Blynde Sign Up</h3>

        <form onSubmit={submitHandler}>
          <div className="mb-3 flex flex-col">
            <label className="text-sm mb-2 font-semibold  text-zinc-900">
              Name
            </label>
            <input
              className="text-xs border text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
              required
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="mb-3 flex flex-col">
            <label className="text-sm mb-2 font-semibold  text-zinc-900">
              Email Address
            </label>
            <input
              className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="mb-3 flex flex-col">
            <label className="text-sm mb-2 font-semibold  text-zinc-900">
              Password
            </label>
            <input
              className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
              required
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="mb-3 flex flex-col">
            <label className="text-sm mb-2 font-semibold  text-zinc-900">
              Confirm Password
            </label>
            <input
              className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
              required
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>
          <button
            className="bg-sky-500 w-24 hover:bg-sky-600 text-white py-2 px-4"
            type="submit"
          >
            {isPending ? <Spinner /> : "Register"}
          </button>

          <div className="py-3 mt-5 flex justify-between items-center">
            <p className="flex text-xs">
              Have an account?{" "}
              <Link className="text-sky-500" to="/login">
                login
              </Link>{" "}
              here
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterScreen;
