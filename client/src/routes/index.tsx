import React from "react";

import ProtectedRoute from "./ProtectedRoute";
import { RootLayout } from "../layouts/RootLayout";

import AuthLayout from "../layouts/AuthLayout";
import { ROUTES } from "./Routes";
import { lazyLoad } from "../helpers/lazyLoad";

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

const routes = [
  {
    element: <RootLayout />,
    children: [
      { path: ROUTES.HOME, element: lazyLoad(HomeScreen) },
      { path: ROUTES.SHOP, element: lazyLoad(ShopScreen) },
      { path: ROUTES.PRODUCT_DETAILS, element: lazyLoad(ProductScreen) },
      { path: ROUTES.CART, element: lazyLoad(CartScreen) },
      { path: ROUTES.COMPARE, element: lazyLoad(CompareScreen) },

      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.USER_PROFILE, element: lazyLoad(ProfileScreen) },
          { path: ROUTES.WISHLIST, element: lazyLoad(WishlistScreen) },
          { path: ROUTES.ORDER_SHIPPING, element: lazyLoad(ShippingScreen) },
          { path: ROUTES.ORDER_PAYMENT, element: lazyLoad(PaymentScreen) },
          { path: ROUTES.PLACE_ORDER, element: lazyLoad(PlaceOrderScreen) },
          { path: ROUTES.ORDER_DETAILS, element: lazyLoad(OrderScreen) },
        ],
      },

      {
        path: ROUTES.ORDER_PAYMENT_SUCCESS,
        element: lazyLoad(PaymentSuccessScreen),
      },
      {
        path: ROUTES.ORDER_PAYMENT_ERROR,
        element: lazyLoad(PaymentErrorScreen),
      },

      { path: ROUTES.NOT_FOUND, element: lazyLoad(NotFoundScreen) },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: lazyLoad(LoginScreen) },
      { path: ROUTES.REGISTER, element: lazyLoad(RegisterScreen) },
      {
        path: ROUTES.FORGOT_PASSWORD,
        element: lazyLoad(ResetRequestPasswordScreen),
      },
      {
        path: ROUTES.RESET_PASSWORD_CONFIRM,
        element: lazyLoad(ResetPasswordConfirmScreen),
      },
    ],
  },
];

export default routes;
