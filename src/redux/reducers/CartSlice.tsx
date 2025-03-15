import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShippingAddress } from "../../types";
import { getLocalStorageItem } from "../../helpers/utils";
import { CartItem, CartState } from "../../types/redux/cart";
import { RootState, useAppSelector } from "../../types/redux";

const cartItemsFromStorage: CartItem[] = getLocalStorageItem("cartItems", []);
const shippingAddressFromStorage = getLocalStorageItem("shippingAddress", null);
const paymentMethodFromStorage = getLocalStorageItem("paymentMethod", null);

const initialState: CartState = {
  loading: true,
  error: false,
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        productId: string;
        name: string;
        price: number;
        thumbnailUrl: string;
        qty: number;
        color: string;
        size: string;
      }>
    ) => {
      const { productId, name, price, thumbnailUrl, qty, color, size } =
        action.payload;

      const productIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (productIndex > -1) {
        const existingVariation = state.cartItems[productIndex].variations.find(
          (item) => item.color === color && item.size === size
        );

        if (existingVariation) {
          existingVariation.qty += qty;
        } else {
          state.cartItems[productIndex].variations.push({ qty, color, size });
        }
      } else {
        state.cartItems.push({
          productId,
          name,
          price,
          thumbnailUrl,
          qty,
          variations: [{ qty, color, size }],
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; color: string; size: string }>
    ) => {
      const { productId, color, size } = action.payload;

      const productIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );
      if (productIndex > -1) {
        // Remove the specific variation
        state.cartItems[productIndex].variations = state.cartItems[
          productIndex
        ].variations.filter(
          (item) => !(item.color === color && item.size === size)
        );

        // If no variations remain, remove the whole product
        if (state.cartItems[productIndex].variations.length === 0) {
          state.cartItems.splice(productIndex, 1);
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        color: string;
        size: string;
        qty: number;
      }>
    ) => {
      const { productId, color, size, qty } = action.payload;

      const product = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (product) {
        const variation = product.variations.find(
          (item) => item.color === color && item.size === size
        );
        if (variation) {
          variation.qty = qty;
        }
      }

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

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((totalCount, item) => {
      const itemCount = item.variations.reduce(
        (sum, variation) => sum + variation.qty,
        0
      );
      return totalCount + itemCount;
    }, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, item) => {
    const itemTotal = item.variations.reduce(
      (sum, variation) => sum + variation.qty * item.price,
      0
    );
    return total + itemTotal;
  }, 0)
);
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  savePaymentMethod,
  saveShippingAddress,
} = cartSlice.actions;

export const useCart = () => {
  return useAppSelector((state) => state.cart);
};
export default cartSlice.reducer;
