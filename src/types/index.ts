import { CartItem } from "./redux/cart";

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

export interface WishlistItem {
  id: string;
  product: Product;
  added_at: Date;
}

export interface Discount {
  id: number;
  title: string;
  description: string;
  discount_type: "fixed" | "percentage";
  amount: number;
  is_global: boolean;
  start_date: string;
  end_date: string;
  priority: number;
}
export interface Offer {
  id: string;
  name: string;
  description: string;
  price: number;
  sale_price: number;
  thumbnail: string;
  countInStock: number;
  end_date: string;
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

export type Product = {
  _id: string;
  slug: string;
  name: string;
  price: string;
  thumbnail_url: string;
  discounted_price: number;
  discount_percentage: number;
  badge: string;
  countInStock: number;
  date: Date;
  sizes: Size[];
  categories: Category[];
  colors: [];
  reviews_count: number;
  rating: number;
  priceBadge: string;
  description: string;
  image_albums: [
    {
      image_url: string;
    }
  ];
};

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

export type Review = {
  _id?: string;
  product: Product | string;
  user: User | string;
  rating: number;
  comment: string;
  createdAt?: string;
};
