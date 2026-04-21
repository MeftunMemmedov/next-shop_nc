import { getProductPrice } from '@/helpers';
import { CartItem, InventoryStateProps, Product } from '@/types';
import { WritableDraft } from '@reduxjs/toolkit';

type InventoryState = WritableDraft<InventoryStateProps>;

// ----CLEAR
export const clearCart = (state: InventoryState) => {
  state.local.cart.count = 0;
  state.local.cart.items = [];
  state.local.cart.total = 0;
};

// ----ADD
export const addToLocalCart = (
  state: InventoryState,
  action: {
    type: string;
    payload: CartItem;
  }
) => {
  const { product, quantity } = action.payload;
  const newItem = { product, quantity };
  const updatedItems = [...state.local.cart.items, newItem];

  state.local.cart.items = updatedItems;
  state.local.cart.count = updatedItems.length;
  state.local.cart.total = updatedItems.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
  localStorage.setItem('cart', JSON.stringify(updatedItems));
};

// ----REMOVE
export const removeFromLocalCart = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const updatedItems = state.local.cart.items.filter(
    (item) => item.product.slug !== payload.slug
  );

  state.local.cart.items = updatedItems;
  state.local.cart.count = updatedItems.length;
  state.local.cart.total = updatedItems.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
  localStorage.setItem('cart', JSON.stringify(updatedItems));
};

// ----CHANGE QUANTITY
export const changeLocalCartItemQuantity = (
  state: InventoryState,
  { payload }: { payload: CartItem }
) => {
  const { product, quantity } = payload;
  const updatedCart = state.local.cart.items.map((item) => {
    if (item.product.slug === product.slug) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  state.local.cart.items = updatedCart;
  state.local.cart.count = updatedCart.length;
  state.local.cart.total = updatedCart.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

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
