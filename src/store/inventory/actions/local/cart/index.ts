import { getProductPrice } from '@/helpers';
import { CartItem, CartPayload, InventoryState, Product } from '@/types';

// ----HELPERS
const updateCart = (state: InventoryState, updatedCart: CartItem[]) => {
  const { cart } = state.local;

  cart.count = updatedCart.length;
  cart.total = updatedCart.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

// ----CLEAR
export const clearLocalCart = (state: InventoryState) => {
  const { cart } = state.local;

  cart.items = [];
  updateCart(state, cart.items);
};

// ----INIT
export const initLocalCart = (state: InventoryState) => {
  try {
    const localCartData = localStorage.getItem('cart');
    const localCart = localCartData
      ? (JSON.parse(localCartData) as CartItem[])
      : [];

    const { cart } = state.local;

    cart.items = localCart;
    cart.count = localCart.length;
    cart.total = localCart.reduce((acc, item) => {
      return acc + getProductPrice(item.product) * item.quantity;
    }, 0);
  } catch {
    console.error('REDUX ERROR CART STATE');
  }
};

// ----ADD
export const addToLocalCart = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { product, quantity } = payload;

  const newItem = { product, quantity };

  const { cart } = state.local;

  cart.items.push(newItem);
  updateCart(state, cart.items);
};

// ----REMOVE
export const removeFromLocalCart = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const { cart } = state.local;

  cart.items = cart.items.filter((item) => item.product.slug !== payload.slug);
  updateCart(state, cart.items);
};

// ----CHANGE QUANTITY
export const changeLocalCartItemQuantity = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { cart } = state.local;

  const { product, quantity } = payload;

  cart.items = cart.items.map((item) => {
    if (item.product.slug === product.slug) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  updateCart(state, cart.items);
};
