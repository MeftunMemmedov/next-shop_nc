import { InventoryState, Product, WishlistItem } from '@/types';

// HELPERS
const updateUserWishlist = (state: InventoryState, data: WishlistItem[]) => {
  state.user.inventory.wishlist.items = data;
  state.user.inventory.wishlist.count = data.length;
};

// CLEAR
export const clearUserWishlist = (state: InventoryState) => {
  state.user.inventory.wishlist.items = [];
  state.user.inventory.wishlist.count = 0;
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
  const updatedItems = [
    ...state.user.inventory.wishlist.items!,
    { product: payload },
  ];
  updateUserWishlist(state, updatedItems);
};

// REMOVE
export const removeFromUserWishlist = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const updatedItems = state.user.inventory.wishlist.items!.filter(
    (item) => item.product.id !== payload.id
  );
  updateUserWishlist(state, updatedItems);
};
