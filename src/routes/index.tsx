import React from "react";

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
const PlaceOrderScreen = React.lazy(() => import("../pages/PlaceOrderScreen"));
const OrderScreen = React.lazy(() => import("../pages/OrderScreen"));
const WishlistScreen = React.lazy(() => import("../pages/WishlistScreen"));

// const OrderListScreen = React.lazy(
//   () => import("../pages/admin/OrderListScreen")
// );
// const ProductEditScreen = React.lazy(
//   () => import("../pages/admin/ProductEditScreen")
// );
// const ProductListScreen = React.lazy(
//   () => import("../pages/admin/ProductListScreen")
// );
// const UserListScreen = React.lazy(
//   () => import("../pages/admin/UserListScreen")
// );
// const UserEditScreen = React.lazy(
//   () => import("../pages/admin/UserEditScreen")
// );

const routes = [
  {
    title: "General",
    items: [
      {
        name: "HomeScreen",
        path: "/",
        component: <HomeScreen />,
      },
      {
        name: "ShopScreen",
        path: "/shop",
        component: <ShopScreen />,
      },
      {
        name: "WishlistScreen",
        path: "/my-wishlist",
        component: <WishlistScreen />,
      },
      {
        name: "ProfileScreen",
        path: "/profile",
        component: <ProfileScreen />,
      },
      {
        name: "NotFoundScreen",
        path: "*",
        component: <NotFoundScreen />,
      },
    ],
  },
  {
    title: "Authentication",
    items: [
      {
        name: "LoginScreen",
        path: "/login",
        component: <LoginScreen />,
      },
      {
        name: "RegisterScreen",
        path: "/register",
        component: <RegisterScreen />,
      },
      {
        name: "PasswordResetScreen",
        path: "/request-reset-password",
        component: <ResetPasswordScreen />,
      },
      {
        name: "ResetPasswordConfirmScreen",
        path: "/request-reset-password/confirm",
        component: <ResetPasswordConfirmScreen />,
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        name: "ProductScreen",
        path: "/product/:id",
        component: <ProductScreen />,
      },

      {
        name: "CartScreen",
        path: "/cart/*",
        component: <CartScreen />,
      },
    ],
  },
  {
    title: "Order",
    items: [
      {
        name: "OrderScreen",
        path: "/order/:id",
        component: <OrderScreen />,
      },
      {
        name: "PlaceOrderScreen",
        path: "/placeorder",
        component: <PlaceOrderScreen />,
      },
      {
        name: "ShippingScreen",
        path: "/shipping/",
        component: <ShippingScreen />,
      },
      {
        name: "PaymentScreen",
        path: "/payment/",
        component: <PaymentScreen />,
      },
    ],
  },
  // {
  //   title: "Dashboard",
  //   items: [
  //     {
  //       name: "UserListScreen",
  //       path: "/admin/userlist",
  //       component: <UserListScreen />,
  //     },
  //     {
  //       name: "UserEditScreen",
  //       path: "/admin/userlist/:id/",
  //       component: <UserEditScreen />,
  //     },
  //     {
  //       name: "ProductListScreen",
  //       path: "/admin/productlist",
  //       component: <ProductListScreen />,
  //     },
  //     {
  //       name: "ProductEditScreen",
  //       path: "/admin/product/:id/edit",
  //       component: <ProductEditScreen />,
  //     },
  //     {
  //       name: "OrderListScreen",
  //       path: "/admin/orderlist",
  //       component: <OrderListScreen />,
  //     },
  //   ],
  // },
];
export default routes;
