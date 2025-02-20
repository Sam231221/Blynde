import type React from "react";

interface ErrorFetchingReviewsProps {
  queryName: string;
  errorMessage: string;
  onRetry?: () => void;
}

const ErrorFetching: React.FC<ErrorFetchingReviewsProps> = ({
  queryName,
  errorMessage,
  onRetry,
}) => {
  return (
    <div className="bg-red-50 rounded-lg shadow-sm p-6 my-4 text-center">
      <div className="flex flex-col items-center">
        <svg
          className="w-16 h-16 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-red-800 mb-2">
          Error Fetching {queryName}
        </h3>
        <p className="text-red-600 mb-4">{errorMessage}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorFetching;
