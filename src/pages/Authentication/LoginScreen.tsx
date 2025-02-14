import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogin } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { RootState } from "../../types";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const params = new URLSearchParams(window.location.search);

  const redirect = params.get("redirect") ? params.get("redirect") : "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(formData, {
      onSuccess: () => {
        toast.success("Login successfully.");
        if (redirect === "shipping") {
          navigate("/shipping");
        }
        if (redirect === "/") {
          navigate("/");
        } else {
          navigate("/" + redirect);
        }
      },
      onError: (err) => {
        const errorResponse = err as {
          response?: { data?: { errors?: { general?: string } } };
        };
        if (errorResponse.response?.data?.errors) {
          if (errorResponse.response.data.errors.general) {
            toast.error(errorResponse.response.data.errors.general);
          } else {
            setErrors(errorResponse.response.data.errors);
          }
        } else {
          toast.error("Something went wrong on the backend.");
        }
      },
    });
  };

  // useEffect(() => {
  //   if (userInfo && redirect == "shipping") {
  //     console.log("Redirecting to shipping");
  //     navigate("/shipping");
  //   }
  //   if (userInfo && userInfo.email_verified && redirect == "/") {
  //     navigate("/");
  //   }
  // }, [userInfo, navigate, redirect]);

  return (
    <div className="min-h-screen bg-zinc-200/20 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="mb-8">
            <div className="text-teal-600 font-semibold flex items-center gap-2 mb-6">
              <span className="text-2xl">⌘</span>
              <span>Blynde</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="momohhalima42@gmail.com"
              />
              {errors["username"] && (
                <p className="text-red-500 text-sm">{errors["username"]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="at least 8 character"
              />
              {errors["password"] && (
                <p className="text-red-500 text-sm">{errors["password"]}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember Me</span>
              </label>
              <a
                href="/request-reset-password"
                className="text-sm text-teal-600 hover:text-teal-500"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition duration-200"
            >
              {isPending ? <Spinner /> : "Login"}
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
            >
              Sign In with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Not registered yet?{" "}
              <Link to="/register" className="text-sky-600 hover:text-sky-500">
                Create an Account
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-sky-900/30">
            <div className="p-12 text-white h-full flex flex-col justify-end">
              <h2 className="text-3xl font-bold mb-4">Blynde Fashion House</h2>
              <p className="text-white/90">
                Step into a world of timeless elegance and contemporary style.
                At Blynde, we believe fashion is a personal expression of your
                unique story, crafted with precision and delivered with
                excellence.
              </p>
            </div>
          </div>
          <img
            src="/Banner.png"
            alt="Fitness"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
