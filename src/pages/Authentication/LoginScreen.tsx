import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { Message } from "../../components/Message";

import { AppDispatch, RootState } from "../../types";
import { useLogin } from "../../hooks/useAuth";
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { mutate: login, isLoading, isError } = useLogin();
  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.auth
  );

  const params = new URLSearchParams(window.location.search);

  const redirect = params.get("redirect") ? params.get("redirect") : "/";

  useEffect(() => {
    if (userInfo && redirect == "/") {
      navigate("/");
    }
    if (userInfo && redirect == "shipping") {
      navigate("/" + redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username: email, password });
  };

  return (
    <div className="pb-10 pt-10 flex  h-screen">
      <div className="form-signin border shadow w-[300px] sm:w-[500px] m-auto px-5">
        <h3 className="mb-2 mt-3 font-bold text-2xl text-center">
          Blynde Login
        </h3>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <form className="text-sm" onSubmit={submitHandler}>
          <div className="mb-3 flex flex-col">
            <label className="text-sm mb-2 font-semibold  text-zinc-900">
              Email Address
            </label>
            <input
              className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
              type="email"
              placeholder="Email address"
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
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>

          <div className="mt-3 flex justify-between">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="" id="keepme" />
              <label className="" htmlFor="keepme">
                Keep Me Logged In
              </label>
            </div>
            <span className="text-sky-500  font-medium">Forgot Password?</span>
          </div>
          <div className="py-3 mt-5 flex justify-between items-center">
            <p className="flex text-xs">
              Dont Have an account?{" "}
              <Link className="text-sky-500" to="/register">
                Sign Up
              </Link>{" "}
              here
            </p>
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
