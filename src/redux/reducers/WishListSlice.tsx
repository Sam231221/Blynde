import { createSlice } from "@reduxjs/toolkit";
import { WishlistItem, WishlistState } from "../../types";
const wishlistItemsFromStorage: WishlistItem[] = JSON.parse(
  localStorage.getItem("wishlitstItems") || "[]"
);
const initialState: WishlistState = {
  loading: true,
  error: false,
  wishlistItems: wishlistItemsFromStorage,
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action) => {
      // Logic to add item to wishlist
    },
    removeItemFromWishlist: (state, action) => {
      // Logic to remove item from wishlist
    },
    // ... other wishlist-related reducers
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
