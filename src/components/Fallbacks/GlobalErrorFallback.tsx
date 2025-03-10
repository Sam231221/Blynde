export function GlobalErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <section className="text-center h-screen flex items-center justify-center mx-auto py-2 overflow-auto mt-10">
      <div>
        <h1>Something went wrong.</h1>
        <p style={{ color: "red" }}>{error.message}</p>
        <p>Please try reloading the Page or check your connection.</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2"
        >
          Reload Page
        </button>
      </div>
    </section>
  );
}

export default GlobalErrorFallback;
