import { getProductPrice } from '@/helpers';
import { CartItem, CartPayload, InventoryState, Product } from '@/types';

// -HELPERS
const updateUserCart = (state: InventoryState, data: CartItem[]) => {
  const { cart } = state.user.inventory;

  cart.count = data.length;
  cart.total = data.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
};

// ---CART
export const clearUserCart = (state: InventoryState) => {
  const { cart } = state.user.inventory;

  cart.items = [];
  updateUserCart(state, cart.items);
};

// ---SET
export const initUserCart = (
  state: InventoryState,
  { payload }: { payload: CartItem[] }
) => {
  const { cart } = state.user.inventory;

  cart.items = payload;
  updateUserCart(state, cart.items);
};

// ---ADD
export const addToUserCart = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { cart } = state.user.inventory;

  const { product, quantity } = payload;

  const newItem = { product, quantity };

  if (cart.items === null) return;

  cart.items.push(newItem);

  updateUserCart(state, cart.items);
};

//---REMOVE
export const removeFromUserCart = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const { cart } = state.user.inventory;

  if (cart.items === null) return;

  cart.items = cart.items.filter((item) => item.product.slug !== payload.slug);
  updateUserCart(state, cart.items);
};

// ---CHANGE QUANTITY
export const changeUserCartItemQuantity = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { cart } = state.user.inventory;

  const { product, quantity } = payload;

  if (cart.items === null) return;

  cart.items = cart.items.map((item) => {
    if (item.product.slug === product.slug) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  updateUserCart(state, cart.items);
};
