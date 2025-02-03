import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogin } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { RootState } from "../../types";
import { toast, ToastContainer } from "react-toastify";
function LoginScreen() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const params = new URLSearchParams(window.location.search);

  const redirect = params.get("redirect") ? params.get("redirect") : "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => {
        toast.success("Login successfully.");
        navigate("/");
      },
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
    });
  };

  useEffect(() => {
    if (userInfo && redirect == "/") {
      navigate("/");
    }
    if (userInfo && redirect == "shipping") {
      navigate("/" + redirect);
    }
  }, [userInfo, navigate, redirect]);
  return (
    <div className="pb-10 pt-10 flex  h-screen">
      <div className="form-signin border shadow w-[300px] sm:w-[500px] m-auto px-5">
        <h3 className="mb-2 mt-3 font-bold text-2xl text-center">
          Blynde Login
        </h3>

        <form className="text-sm" onSubmit={submitHandler}>
          <div className="mb-3 flex flex-col">
            <label className="text-sm mb-2 font-semibold  text-zinc-900">
              Email Address
            </label>
            <input
              className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
              type="email"
              name="username"
              placeholder="Email address"
              value={formData.username}
              onChange={handleChange}
            ></input>
          </div>

          <div className="mb-3 flex flex-col">
            <label className="text-sm mb-2 font-semibold  text-zinc-900">
              Password
            </label>
            <input
              className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
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
              className="bg-sky-500 w-16 hover:bg-sky-600 text-white py-2 px-4"
              type="submit"
            >
              {isPending ? <Spinner /> : "Login"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginScreen;
