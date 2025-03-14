export default function Spinner({
  width = 12,
  height = 12,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div
      className={`inline-block h-${height} w-${width} animate-spin rounded-full border-4 border-solid border-blue-400 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
