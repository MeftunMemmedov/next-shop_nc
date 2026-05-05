import { InventoryStateProps, Product, WishlistItem } from '@/types';
import { WritableDraft } from '@reduxjs/toolkit';

type InventoryState = WritableDraft<InventoryStateProps>;

// ----HELPERS
const updateLocalWishlist = (state: InventoryState, data: WishlistItem[]) => {
  const { wishlist } = state.local;

  wishlist.count = data.length;
  localStorage.setItem('wishlist', JSON.stringify(data));
};

// ----INIT
export const initLocalWishlist = (state: InventoryState) => {
  try {
    const localWishlistData = localStorage.getItem('wishlist');
    const localWishlist = localWishlistData
      ? (JSON.parse(localWishlistData) as WishlistItem[])
      : [];

    const { wishlist } = state.local;

    wishlist.items = localWishlist;
    wishlist.count = localWishlist.length;
  } catch {
    console.log('REDUX ERROR WISHLIST');
  }
};

// ----CLEAR
export const clearLocalWishlist = (state: InventoryState) => {
  const { wishlist } = state.local;

  wishlist.items = [];
  updateLocalWishlist(state, wishlist.items);
};

// ----ADD
export const addToLocalWishlist = (
  state: InventoryState,
  { payload }: { payload: WishlistItem }
) => {
  const { wishlist } = state.local;

  wishlist.items.push(payload);
  updateLocalWishlist(state, wishlist.items);
};

// ----REMOVE
export const removeFromLocalWishlist = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const { wishlist } = state.local;

  wishlist.items = wishlist.items.filter(
    (item) => item.product.slug !== payload.slug
  );
  updateLocalWishlist(state, wishlist.items);
};
