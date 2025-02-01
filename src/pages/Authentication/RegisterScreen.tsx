import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader";
import { Message } from "../../components/Message";

import { RootState, AppDispatch } from "../../types";
import { useRegister } from "../../hooks/useAuth";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const redirect = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (userInfo) {
      redirect("/login");
    }
  }, [userInfo]);
  const { mutate: register, isLoading, isError } = useRegister();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (password != confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="pb-10 pt-10 flex  h-screen">
      <div className="form-signin shadow  w-[300px] sm:w-[500px] m-auto px-10">
        <h3 className="mb-2 font-bold text-2xl text-center">Blynde Sign Up</h3>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
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
          <input
            className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4"
            type="submit"
            value={"Register"}
          />

          <div className="py-3 mt-5 flex justify-between items-center">
            <p className="flex text-xs">
              Have an account?{" "}
              <Link className="text-sky-500" to="/login">
                Login
              </Link>{" "}
              here
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterScreen;
