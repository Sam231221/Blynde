import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";

import { Modal } from "../components/Modal";
import ProductCompareToast from "../components/globals/ProductCompareToast";
import Header from "../components/Header";

export const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Modal />
      <ProductCompareToast />
    </>
  );
};
