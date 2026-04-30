import { InventoryStateProps, Product, WishlistItem } from '@/types';
import { WritableDraft } from '@reduxjs/toolkit';

type InventoryState = WritableDraft<InventoryStateProps>;

// ----HELPERS
export const updateLocalWishlist = (
  state: InventoryState,
  data: WishlistItem[]
) => {
  state.local.wishlist.items = data;
  state.local.wishlist.count = data.length;
  localStorage.setItem('wishlist', JSON.stringify(data));
};

// ----CLEAR
export const clearLocalWishlist = (state: InventoryState) => {
  state.local.wishlist.count = 0;
  state.local.wishlist.items = [];
};

// ----ADD
export const addToLocalWishlist = (
  state: InventoryState,
  { payload }: { payload: WishlistItem }
) => {
  const updatedItems = [...state.local.wishlist.items, payload];

  updateLocalWishlist(state, updatedItems);
};

// ----REMOVE
export const removeFromLocalWishlist = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const updatedItems = state.local.wishlist.items.filter(
    (item) => item.product.slug !== payload.slug
  );

  updateLocalWishlist(state, updatedItems);
};
