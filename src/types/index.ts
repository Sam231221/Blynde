import store from "../redux/store";

export interface User {
  refresh: string;
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  profile_pic_url: string;
  email: string;
  email_verified: boolean;
  token: string;
}
export interface AuthState {
  userInfo: User | null;
}

export interface UserInfo {
  _id?: string;
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
  _id?: string;
  productId: string;
  name: string;
  price: number;
  qty: number;
  color: string;
  size: string;
  thumbnail: string;
}

export interface Order {
  _id?: string; // Use _id to match Django's default PK
  user: User; // Or a more specific user type
  orderItems: OrderItem[] | CartItem[];
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
  _id?: string;
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
  _id?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
export type Size = {
  _id: string;
  name: string;
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
  _id: number;
  name: string;
  price: number;
  thumbnail: string;
  sale_price?: number;
  badge: string;
  size: Size[];
  date: Date;
  categories: Category[];
  review_count: number;
  countInStock: number;
  rating: number;
  colors: [];
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
  _id?: string;
  product: number; // Product ID
  user: string | null;
  name: string;
  rating: number; // 1 to 5 stars
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
