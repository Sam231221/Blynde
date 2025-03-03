import { FallbackProps } from "react-error-boundary";

export function ErrorFallback({ error }: FallbackProps) {
  return (
    <div role="alert" className="error-boundary">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()}>Refresh</button>
    </div>
  );
}
