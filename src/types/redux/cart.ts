import { ShippingAddress } from "..";
export interface CartState {
  loading: boolean;
  error: boolean;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
  paymentMethod: string | null;
}
export interface CartItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
  thumbnailUrl: string;
  variations: CartItemVariation[];
}
export interface CartItemVariation {
  qty: number;
  color: string;
  size: string;
}
