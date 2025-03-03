import { ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/Loader";
import { ErrorFallback } from "../components/ErrorBoundary";

export const lazyLoad = (
  Component: React.LazyExoticComponent<() => ReactElement>
) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);

// export const lazyLoad = (Component: React.LazyExoticComponent<React.FC>) => {
//   return (
//     <React.Suspense fallback={<div>Loading...</div>}>
//       <Component />
//     </React.Suspense>
//   );
// };
