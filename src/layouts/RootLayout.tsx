import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";

import ProductCompareToast from "../components/globals/ProductCompareToast";
import Header from "../components/Header";
import { Modal } from "../components/Modal";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loader from "../components/Loader";
import GlobalErrorFallback from "../components/Fallbacks/GlobalErrorFallback";

export const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
        <Suspense fallback={<Loader />}>
          <main>
            <Outlet />
          </main>
        </Suspense>
      </ErrorBoundary>
      <Footer />
      <Modal />
      <ProductCompareToast />
    </>
  );
};
