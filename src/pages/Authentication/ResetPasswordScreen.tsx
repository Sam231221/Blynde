// React component (e.g., ResetPasswordScreen.tsx)
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { usePasswordReset } from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const ResetPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  //   const { mutate, isLoading } = useMutation(
  //     async (email: string) => {
  //       try {
  //         const response = await axios.post("/api/password_reset/", { email }); // Adjust URL if needed
  //         return response.data; // You might not need to return anything, but you can if your API does.
  //       } catch (err: any) {
  //         // Handle errors more comprehensively. Check for specific status codes!
  //         if (err.response) {
  //           console.error("Server Error:", err.response.data); // Log for debugging
  //           throw new Error(err.response.data.email[0]); // Or a more specific message
  //         } else if (err.request) {
  //           console.error("Request Error:", err.request);
  //           throw new Error("No response received from the server.");
  //         } else {
  //           // Something happened in setting up the request that triggered an Error
  //           console.error("Setup Error:", err.message);
  //           throw new Error("An error occurred while setting up the request.");
  //         }
  //       }
  //     },
  //     {
  //       onSuccess: (data) => {
  //         dispatch(setPasswordResetRequestSent(true)); // Dispatch Redux action
  //         setSuccessMessage(
  //           "Password reset request sent successfully. Check your email."
  //         );
  //         setError(null);
  //         setEmail(""); // Clear the form
  //       },
  //       onError: (error: any) => {
  //         setError(error.message); // Set the error message from the API or the more generic one.
  //         setSuccessMessage(null);
  //       },
  //     }
  //   );

  const { mutate: resetMutation, isPending } = usePasswordReset();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    resetMutation(email, {
      onSuccess: (data) => {
        toast.success(data.detail);
        setError(null);
        // toast.success(data.response.data.detail);
        setEmail(""); // Clear the form
      },
      onError: (err) => {
        // setError(err.message); // Set the error message from the API or the more generic one.
        // setSuccessMessage(null);
        if (err.response.data.error) {
          toast.error(
            err.response.data.error ||
              "An error occurred while setting up the request."
          ); // Or a more specific message
        }
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      {" "}
      {/* Tailwind CSS classes */}
      <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isPending} // Disable while loading
        >
          {isPending ? "Sending..." : "Reset Password"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordScreen;
