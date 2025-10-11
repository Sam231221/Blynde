export default function Loader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-400 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
