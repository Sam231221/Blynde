import { Order, OrderItem, Product, ShippingAddress, User } from "..";
import store from "../../redux/store";
export interface FilterState {
  categories: string[];
  price: [number, number];
  sizes: string[];
  color: string;
  ordering: string;
  page: number;
  products_limit: number;
  productsDisplayType: "grid" | "list";
}
export interface CompareState {
  products: Product[];
}

export interface OrderResponseState extends Order {
  orderItems: OrderItem[];
  user: User;
  shippingAddress: ShippingAddress;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
