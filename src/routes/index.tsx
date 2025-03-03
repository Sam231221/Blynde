import React, { ReactElement, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/Loader";
import { ScrollRestoration } from "react-router-dom";
import { Modal } from "../components/Modal";
import ProductCompareToast from "../components/globals/ProductCompareToast";
import { RootLayout } from "../layouts";
import { ComponentType, ReactNode } from "react";

const HomeScreen = React.lazy(() => import("../pages/HomeScreen"));
const ShopScreen = React.lazy(() => import("../pages/ShopScreen"));
const CartScreen = React.lazy(() => import("../pages/CartScreen"));
const ProductScreen = React.lazy(() => import("../pages/ProductScreen"));
const NotFoundScreen = React.lazy(() => import("../pages/NotFound"));
const LoginScreen = React.lazy(
  () => import("../pages/Authentication/LoginScreen")
);
const RegisterScreen = React.lazy(
  () => import("../pages/Authentication/RegisterScreen")
);
const ResetRequestPasswordScreen = React.lazy(
  () => import("../pages/Authentication/ResetRequestPasswordScreen")
);
const ResetPasswordConfirmScreen = React.lazy(
  () => import("../pages/Authentication/ResetPasswordConfirmScreen")
);
const ProfileScreen = React.lazy(() => import("../pages/ProfileScreen"));
const ShippingScreen = React.lazy(() => import("../pages/ShippingScreen"));
const PaymentScreen = React.lazy(() => import("../pages/PaymentScreen"));
const PaymentSuccessScreen = React.lazy(
  () => import("../pages/PaymentSuccessScreen")
);
const PaymentErrorScreen = React.lazy(
  () => import("../pages/PaymentErrorScreen")
);
const PlaceOrderScreen = React.lazy(() => import("../pages/PlaceOrderScreen"));
const OrderScreen = React.lazy(() => import("../pages/OrderScreen"));
const WishlistScreen = React.lazy(() => import("../pages/WishlistScreen"));
const CompareScreen = React.lazy(() => import("../pages/CompareScreen"));
type LayoutProps = {
  children: ReactNode;
};
// Generic type for the withProviders function
type WithProvidersType = <P extends object>(
  Component: ComponentType<P>,
  Layout?: ComponentType<LayoutProps>
) => (props: P & React.Attributes) => ReactElement;

const withProviders: WithProvidersType = (
  Component,
  Layout = React.Fragment
) => {
  return (props) => (
    <Layout>
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <ScrollRestoration />
          <Component {...props} />
          <Modal />
          <ProductCompareToast />
        </ErrorBoundary>
      </Suspense>
    </Layout>
  );
};

const routes = [
  {
    path: "/",
    element: withProviders(HomeScreen, RootLayout),
  },
  {
    path: "/shop",
    element: withProviders(ShopScreen),
  },
  {
    path: "/my-wishlist",
    element: withProviders(WishlistScreen),
  },
  {
    path: "/compare",
    element: withProviders(CompareScreen),
  },
  {
    path: "/profile",
    element: withProviders(ProfileScreen),
  },
  {
    path: "/login",
    element: withProviders(LoginScreen),
  },
  {
    path: "/register",
    element: withProviders(RegisterScreen),
  },
  {
    path: "/request-reset-password",
    element: withProviders(ResetRequestPasswordScreen),
  },
  {
    path: "/request-reset-password/confirm",
    element: withProviders(ResetPasswordConfirmScreen),
  },
  {
    path: "/products/:slug",
    element: withProviders(ProductScreen),
  },
  {
    path: "/cart/*",
    element: withProviders(CartScreen),
  },
  {
    path: "/myorders/:order_number",
    element: withProviders(OrderScreen),
  },
  {
    path: "/placeorder",
    element: withProviders(PlaceOrderScreen),
  },
  {
    path: "/shipping",
    element: withProviders(ShippingScreen),
  },
  {
    path: "/payment",
    element: withProviders(PaymentScreen),
  },
  {
    path: "/payment/success",
    element: withProviders(PaymentSuccessScreen),
  },
  {
    path: "/payment/error",
    element: withProviders(PaymentErrorScreen),
  },
  {
    path: "*",
    element: withProviders(NotFoundScreen),
  },
];

export default routes;
