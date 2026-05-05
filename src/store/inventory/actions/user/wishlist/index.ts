import { InventoryState, Product, WishlistItem } from '@/types';

// HELPERS
const updateUserWishlist = (state: InventoryState, data: WishlistItem[]) => {
  const { wishlist } = state.user.inventory;

  wishlist.items = data;
  wishlist.count = data.length;
};

// CLEAR
export const clearUserWishlist = (state: InventoryState) => {
  const { wishlist } = state.user.inventory;

  wishlist.items = [];
  wishlist.count = 0;
};

// INIT
export const initUserWishlist = (
  state: InventoryState,
  { payload }: { payload: WishlistItem[] }
) => {
  updateUserWishlist(state, payload);
};

// ADD
export const addToUserWishlist = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const { wishlist } = state.user.inventory;

  if (wishlist.items === null) return;

  wishlist.items.push({ product: payload });
  updateUserWishlist(state, wishlist.items);
};

// REMOVE
export const removeFromUserWishlist = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const { wishlist } = state.user.inventory;

  if (wishlist.items === null) return;

  wishlist.items = wishlist.items.filter(
    (item) => item.product.id !== payload.id
  );
  updateUserWishlist(state, wishlist.items);
};
