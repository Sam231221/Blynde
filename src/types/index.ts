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
export interface AuthState {
  loading: boolean;
  error: string | null;
  userInfo: User | null;
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

export interface Order {
  _id: string; // Use _id to match Django's default PK
  user: User; // Or a more specific user type
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  createdAt: string;
}

export interface OrderItem {
  _id: string;
  product: Product; // Or a more specific product type
  order: string; // Or the Order type itself if you prefer
  name: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  thumbnail: string;
}
export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export type Size = {
  id: number;
  name: string;
  stock: number;
};
export type Product = {
  _id: number;
  name: string;
  price: number;
  thumbnail: string;
  sale_price?: number;
  badge: string;
  size: Size[];
  review_count: number;
  countInStock: number;
  rating: number;
  colors: { hex_code: string; name: string; stock?: number }[];
  priceBadge: string;
  discount_percentage: number;
  description: string;
  image_albums: [
    {
      image: string;
    }
  ];
  // other product properties...
};

export type Review = {
  product: number; // Product ID
  user: number | null; // User ID (nullable)
  name: string;
  rating: number; // 1 to 5 stars
  comment: string;
  createdAt: string; // ISO date string
  // other review properties...
};
export interface ProductState {
  allProducts: Product[];
  topProducts: Product[];
  recentProducts: Product[];
  productDetail: Product | null;
  loading: boolean;
  error: string | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
