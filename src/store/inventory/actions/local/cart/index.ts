import { getProductPrice } from '@/helpers';
import { CartItem, CartPayload, InventoryState, Product } from '@/types';

// ----HELPERS
const updateCart = (state: InventoryState, updatedCart: CartItem[]) => {
  state.local.cart.items = updatedCart;
  state.local.cart.count = updatedCart.length;
  state.local.cart.total = updatedCart.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

// ----CLEAR
export const clearLocalCart = (state: InventoryState) => {
  state.local.cart.count = 0;
  state.local.cart.items = [];
  state.local.cart.total = 0;
  localStorage.setItem('cart', JSON.stringify([]));
};

// ----ADD
export const addToLocalCart = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { product, quantity } = payload;
  const newItem = { product, quantity };
  const updatedItems: CartItem[] = [...state.local.cart.items, newItem];

  updateCart(state, updatedItems);
};

// ----REMOVE
export const removeFromLocalCart = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const updatedItems = state.local.cart.items.filter(
    (item) => item.product.slug !== payload.slug
  );

  updateCart(state, updatedItems);
};

// ----CHANGE QUANTITY
export const changeLocalCartItemQuantity = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { product, quantity } = payload;
  const updatedItems = state.local.cart.items.map((item) => {
    if (item.product.slug === product.slug) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  updateCart(state, updatedItems);
};
