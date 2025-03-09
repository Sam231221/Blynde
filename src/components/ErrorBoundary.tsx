import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error }: FallbackProps) {
  return (
    <div
      role="alert"
      className="container h-[400px] flex justify-center items-center text-center mx-auto py-2 overflow-auto mt-10"
    >
      <div>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button
          className="bg-sky-500 text-white px-3 py-1 rounded-sm"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
