import store from "../redux/store";

export interface User {
  refresh: string;
  access: string;
  id: number;
  _id: number;
  username: string;
  firstName: string;
  email: string;
  name: string;
  isAdmin: boolean;
  token: string;
}
export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  token: string;
}
export interface CartState {
  loading: boolean;
  error: boolean;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
  userLogin: {
    userInfo: UserInfo | null;
  };
  paymentMethod: string | null;
}

export interface CartItem {
  // id: string;
  productId: number;
  name: string;
  price: number;
  color: string;
  size: string;
  thumbnail: string;
  quantity: number;
}
export interface AuthState {
  loading: boolean;
  error: string | null;
  userInfo: User | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  // other product properties...
};
export interface ProductState {
  allProducts: Product[];
  topProducts: Product[];
  recentProducts: Product[];
  loading: boolean;
  error: string | null;
}
