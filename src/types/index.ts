import store from "../redux/store";
import WishlistScreen from "../pages/WishlistScreen";

export interface User {
  _id: string;
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_pic_url: string;
  email: string;
  email_verified: boolean;
  refresh_token: string;
  access_token: string;
}
export interface AuthState {
  userInfo: User | null;
}

export interface CartState {
  loading: boolean;
  error: boolean;
  cartItems: CartItem[];

  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
}
export interface WishlistItem {
  id: string;
  product: Product;
  added_at: Date;
}
export interface WishlistResponse {
  count: number;
  wishlist: WishlistItem[];
}
export interface WishlistItemCreatePayload {
  product: string; // Sending only product ID when adding to wishlist
}

export interface DeleteWishlistPayload {
  productId: number;
}

export interface WishlistState {
  loading: boolean;
  error: boolean;
  wishlistItems: WishlistItem[];
}

export interface CartItem {
  _id?: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  color: string;
  size: string;
  thumbnailUrl: string;
}

export interface Order {
  _id?: string;
  order_number: string;
  user: User;
  orderItems: OrderItem[] | CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string | null;
  status: string;
  isDelivered: boolean;
  deliveredAt: string | null;
  createdAt: string;
}

export interface OrderItem {
  _id?: string;
  product: Product;
  order: Order;
  name: string;
  color: string;
  size: string;
  qty: number;
  price: number;
  thumbnail: string;
}
export interface ShippingAddress {
  _id?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export type Size = {
  _id: string;
  name: string;
  slug: string;
  product_count: number;
  stock: number;
};
export type Category = {
  _id: string;
  name: string;
  slug: string;
  parent?: string;
  product_count: number;
  children: Category[];
};
export type Color = {
  _id: string;
  slug: string;
  hex_code: string;
  name: string;
  stock?: number;
  product_count: number;
};
export interface Pagination {
  current_page: 1;
  total_pages: 12;
  total_items: 23;
  page_size: 2;
  next: null;
  previous: null;
}
export type Product = {
  _id: string;
  slug: string;
  name: string;
  price: number;
  thumbnail_url: string;
  sale_price?: number;
  badge: string;
  countInStock: number;
  date: Date;
  sizes: Size[];
  categories: Category[];
  colors: [];
  review_count: number;
  rating: number;
  priceBadge: string;
  discount_percentage: number;
  description: string;
  image_albums: [
    {
      image_url: string;
    }
  ];
};

export type Review = {
  _id?: string;
  product: Product | string;
  user: User | string;
  rating: number;
  comment: string;
  createdAt?: string;
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
