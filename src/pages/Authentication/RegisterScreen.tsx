import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { useRegister } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { RegisterFormData } from "../../types/auth";
import { ApiErrorResponse } from "../../types/wishlist";

const RegistrationScreen = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { mutate: register, isPending } = useRegister();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    register(formData, {
      onSuccess: () => {
        navigate("/login");
        toast.success("You have successfully created an Account!");
      },
      onError: (error: unknown) => {
        const errorResponse = error as ApiErrorResponse;
        if (errorResponse.errors) {
          setErrors(errorResponse.errors);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      },
    });
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
              Create Account
            </h2>
            <p className="text-gray-500 text-sm">
              Join Blynde today and discover your unique style with our curated
              collection
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="John"
                />
                {errors["firstName"] && (
                  <p className="text-red-500 text-sm">{errors["firstName"]}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Doe"
                />
                {errors["lastName"] && (
                  <p className="text-red-500 text-sm">{errors["lastName"]}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="Choose a unique username"
              />
              {errors["username"] && (
                <p className="text-red-500 text-sm">{errors["username"]}</p>
              )}
            </div>

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
                placeholder="john.doe@example.com"
              />
              {errors["email"] && (
                <p className="text-red-500 text-sm">{errors["email"]}</p>
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
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="at least 8 characters"
              />
              {errors["password"] && (
                <p className="text-red-500 text-sm">{errors["password"]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                placeholder="confirm your password"
              />
              {errors["password"] && (
                <p className="text-red-500 text-sm">{errors["password"]}</p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="ml-2 text-sm text-gray-600"
                >
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              {errors["agreeToTerms"] && (
                <p className="text-red-500 text-sm">{errors["agreeToTerms"]}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 transition duration-200"
            >
              {isPending ? <Spinner /> : "Create Account"}
            </button>

            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200 flex items-center justify-center gap-2"
            >
              Sign Up with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-teal-600 hover:text-teal-500">
                Log In
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
            alt="Fashion"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
