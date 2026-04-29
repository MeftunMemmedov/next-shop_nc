import { InventoryStateProps, Product } from '@/types';
import { WritableDraft } from '@reduxjs/toolkit';

type InventoryState = WritableDraft<InventoryStateProps>;

// --WISHLIST
// ----CLEAR
export const clearLocalWishlist = (state: InventoryState) => {
  state.local.wishlist.count = 0;
  state.local.wishlist.items = [];
};

// ----ADD
export const addToLocalWishlist = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const updatedItems = [...state.local.wishlist.items, payload];

  state.local.wishlist.items = updatedItems;
  state.local.wishlist.count = updatedItems.length;
  localStorage.setItem('wishlist', JSON.stringify(updatedItems));
};

// ----REMOVE
export const removeFromLocalWishlist = (
  state: InventoryState,
  action: { payload: Product }
) => {
  const updatedItems = state.local.wishlist.items.filter(
    (item) => item.slug !== action.payload.slug
  );
  state.local.wishlist.items = updatedItems;
  state.local.wishlist.count = updatedItems.length;
  localStorage.setItem('wishlist', JSON.stringify(updatedItems));
};
