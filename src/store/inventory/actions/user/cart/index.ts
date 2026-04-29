import { getProductPrice } from '@/helpers';
import { CartItem, CartPayload, InventoryState, Product } from '@/types';

// -HELPERS
const updateUserCart = (state: InventoryState, data: CartItem[]) => {
  state.user.inventory.cart.items = data;
  state.user.inventory.cart.count = data.length;
  state.user.inventory.cart.total = data.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
};

// ---CART
export const clearUserCart = (state: InventoryState) => {
  state.user.inventory.cart.count = 0;
  state.user.inventory.cart.items = [];
  state.user.inventory.cart.total = 0;
};

// ---SET
export const initUserCart = (
  state: InventoryState,
  { payload }: { payload: CartItem[] }
) => {
  updateUserCart(state, payload);
};

// ---ADD
export const addToUserCart = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { product, quantity } = payload;
  const newItem = { product, quantity };

  const updatedItems = [...state.user.inventory.cart.items!, newItem];
  updateUserCart(state, updatedItems);
};

//---REMOVE
export const removeFromUserCart = (
  state: InventoryState,
  { payload }: { payload: Product }
) => {
  const updatedItems = state.user.inventory.cart.items!.filter(
    (item) => item.product.slug !== payload.slug
  );

  updateUserCart(state, updatedItems);
};

// ---CHANGE QUANTITY
export const changeUserCartItemQuantity = (
  state: InventoryState,
  { payload }: CartPayload
) => {
  const { product, quantity } = payload;
  const updatedItems = state.user.inventory.cart.items!.map((item) => {
    if (item.product.slug === product.slug) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  updateUserCart(state, updatedItems);
};
