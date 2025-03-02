import { ShippingAddress } from "..";
export interface CartState {
  loading: boolean;
  error: boolean;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
}
export interface CartItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  thumbnailUrl: string;
  variations: CartItemVariation[];
}
export interface CartItemVariation {
  qty: number;
  color: string;
  size: string;
}
