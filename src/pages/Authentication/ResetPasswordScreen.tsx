// React component (e.g., ResetPasswordScreen.tsx)
import React, { useState } from "react";
import { usePasswordReset } from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const ResetPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const { mutate: resetMutation, isPending } = usePasswordReset();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    resetMutation(email, {
      onSuccess: () => {
        toast.success("Password reset email sent successfully.");
        setEmail(""); // Clear the form
      },
      onError: (err) => {
        const errorResponse = err as {
          response?: { data?: { error?: string } };
        };
        if (errorResponse?.response?.data?.error) {
          toast.error(
            errorResponse.response.data.error ||
              "An error occurred while setting up the request."
          );
        }
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      {" "}
      {/* Tailwind CSS classes */}
      <h2 className="text-2xl font-bold mb-4">Password Reset</h2>
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
