import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogin } from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { RootState } from "../../types";
import { toast, ToastContainer } from "react-toastify";
import { columns2 } from "lucide-react";

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
        navigate("/");
        toast.success("Login successfully.");
      },
      onError: (err) => {
        console.error("Registration error (in component):", err);
        if (err.response?.data?.errors) {
          if (err.response.data.errors.general) {
            toast.error(err.response.data.errors.general);
          } else {
            setErrors(err.response.data.errors);
          }
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
              <a href="#" className="text-sm text-teal-600 hover:text-teal-500">
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
              <columns2 size={20} />
              Sign In with columns2
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
      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useLogin } from "../../hooks/useAuth";
// import Spinner from "../../components/Spinner";
// import { RootState } from "../../types";
// import { toast, ToastContainer } from "react-toastify";
// function LoginScreen() {
//   const [formData, setFormData] = useState({ username: "", password: "" });

//   const navigate = useNavigate();
//   const { mutate: login, isPending } = useLogin();
//   const { userInfo } = useSelector((state: RootState) => state.auth);

//   const params = new URLSearchParams(window.location.search);

//   const redirect = params.get("redirect") ? params.get("redirect") : "/";

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   const submitHandler = (e: React.FormEvent) => {
//     e.preventDefault();
//     login(formData, {
//       onSuccess: () => {
//         navigate("/");
//         toast.success("Login successfully.");
//       },
//       onError: (err) => {
//         console.error("Registration error (in component):", err);
//         if (err && err.data && err.data.message) {
//           toast.error(err.data.message);
//         } else if (err.message) {
//           toast.error(err.message); // Display a more general error message
//         } else {
//           toast.error("An error occurred during registration.");
//         }
//       },
//     });
//   };

//   useEffect(() => {
//     if (userInfo && redirect == "/") {
//       navigate("/");
//     }
//     if (userInfo && redirect == "shipping") {
//       navigate("/" + redirect);
//     }
//   }, [userInfo, navigate, redirect]);
//   return (
//     <div className="pb-10 pt-10 flex  h-screen">
//       <div className="form-signin border shadow w-[300px] sm:w-[500px] m-auto px-5">
//         <h3 className="mb-2 mt-3 font-bold text-2xl text-center">
//           Blynde Login
//         </h3>

//         <form className="text-sm" onSubmit={submitHandler}>
//           <div className="mb-3 flex flex-col">
//             <label className="text-sm mb-2 font-semibold  text-zinc-900">
//               Email Address
//             </label>
//             <input
//               className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
//               type="email"
//               name="username"
//               placeholder="Email address"
//               value={formData.username}
//               onChange={handleChange}
//             ></input>
//           </div>

//           <div className="mb-3 flex flex-col">
//             <label className="text-sm mb-2 font-semibold  text-zinc-900">
//               Password
//             </label>
//             <input
//               className="border text-xs text-gray-700 bg-none focus:outline-none focus:border-[1px] focus:border-sky-400 py-2 px-2 "
//               type="password"
//               name="password"
//               placeholder="Enter Your Password"
//               value={formData.password}
//               onChange={handleChange}
//             ></input>
//           </div>

//           <div className="mt-3 flex justify-between">
//             <div className="flex items-center gap-2">
//               <input type="checkbox" name="" id="keepme" />
//               <label className="" htmlFor="keepme">
//                 Keep Me Logged In
//               </label>
//             </div>
//             <span className="text-sky-500  font-medium">Forgot Password?</span>
//           </div>
//           <div className="py-3 mt-5 flex justify-between items-center">
//             <p className="flex text-xs">
//               Dont Have an account?{" "}
//               <Link className="text-sky-500" to="/register">
//                 Sign Up
//               </Link>{" "}
//               here
//             </p>
//             <button
//               className="bg-sky-500 w-16 hover:bg-sky-600 text-white py-2 px-4"
//               type="submit"
//             >
//               {isPending ? <Spinner /> : "Login"}
//             </button>
//           </div>
//         </form>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default LoginScreen;
