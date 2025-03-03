import Footer from "../components/Footer";
import Header from "../components/Header/Header";
import { ReactNode } from "react";

export const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
