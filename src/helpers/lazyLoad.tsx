import { ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/Loader";
import ComponentErrorFallback from "../components/Fallbacks/Errors/ComponentErrorFallback";

export const lazyLoad = (
  Component: React.LazyExoticComponent<() => ReactElement>
) => (
  <ErrorBoundary FallbackComponent={ComponentErrorFallback}>
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  </ErrorBoundary>
);
