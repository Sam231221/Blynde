import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "../components/Loader";
import { ScrollRestoration } from "react-router-dom";
import { Modal } from "../components/Modal";

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
const ResetPasswordScreen = React.lazy(
  () => import("../pages/Authentication/ResetPasswordScreen")
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

const lazyLoad = (
  Component: React.LazyExoticComponent<React.ComponentType>
) => (
  <Suspense fallback={<Loader />}>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ScrollRestoration />
      <Component />
      <Modal />
    </ErrorBoundary>
  </Suspense>
);

const routes = [
  {
    path: "/",
    element: lazyLoad(HomeScreen),
  },
  {
    path: "/shop",
    element: lazyLoad(ShopScreen),
  },
  {
    path: "/my-wishlist",
    element: lazyLoad(WishlistScreen),
  },
  {
    path: "/profile",
    element: lazyLoad(ProfileScreen),
  },
  {
    path: "/login",
    element: lazyLoad(LoginScreen),
  },
  {
    path: "/register",
    element: lazyLoad(RegisterScreen),
  },
  {
    path: "/request-reset-password",
    element: lazyLoad(ResetPasswordScreen),
  },
  {
    path: "/request-reset-password/confirm",
    element: lazyLoad(ResetPasswordConfirmScreen),
  },
  {
    path: "/products/:slug",
    element: lazyLoad(ProductScreen),
  },
  {
    path: "/cart/*",
    element: lazyLoad(CartScreen),
  },
  {
    path: "/myorders/:order_number",
    element: lazyLoad(OrderScreen),
  },
  {
    path: "/placeorder",
    element: lazyLoad(PlaceOrderScreen),
  },
  {
    path: "/shipping",
    element: lazyLoad(ShippingScreen),
  },
  {
    path: "/payment",
    element: lazyLoad(PaymentScreen),
  },
  {
    path: "/payment/success",
    element: lazyLoad(PaymentSuccessScreen),
  },
  {
    path: "/payment/error",
    element: lazyLoad(PaymentErrorScreen),
  },
  {
    path: "*", // 404 route
    element: lazyLoad(NotFoundScreen),
  },
];

export default routes;
