import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CartItem,
  CartState,
  RootState,
  ShippingAddress,
} from "../../../types";

// Get initial cart state from localStorage
const cartItemsFromStorage: CartItem[] = JSON.parse(
  localStorage.getItem("cartItems") || "[]"
);
const userInfoFromStorage = JSON.parse(
  localStorage.getItem("userInfo") || "null"
);
const shippingAddressFromStorage = JSON.parse(
  localStorage.getItem("shippingAddress") || "{}"
);
const paymentMethodFromStorage = JSON.parse(
  localStorage.getItem("paymentMethod") || "null"
);

const initialState: CartState = {
  loading: true,
  error: false,
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  userLogin: { userInfo: userInfoFromStorage },
  paymentMethod: paymentMethodFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, name, price, color, size, thumbnail, quantity } =
        action.payload;
      console.log(action.payload);
      const existingItem = state.cartItems.find(
        (item) =>
          item.productId === productId &&
          item.color === color &&
          item.size === size
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // If item doesn't exist, add it to the cart
        state.cartItems.push({
          productId,
          name,
          price,
          color,
          size,
          thumbnail,
          quantity,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.productId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { quantity, id } = action.payload;
      console.log(action.payload);
      state.cartItems = state.cartItems.map((cartItem) =>
        cartItem.productId === id ? { ...cartItem, quantity } : cartItem
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  savePaymentMethod,
  saveShippingAddress,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart.cartItems;

export default cartSlice.reducer;
