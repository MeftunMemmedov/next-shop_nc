import { getProductPrice } from '@/helpers';
import { CartItem, InventoryStateProps, Product } from '@/types';
import { WritableDraft } from '@reduxjs/toolkit';

type InventoryState = WritableDraft<InventoryStateProps>;

// ---ADD
export const addToUserCart = (
  state: InventoryStateProps,
  action: {
    type: string;
    payload: CartItem;
  }
) => {
  const { product, quantity } = action.payload;
  const newItem = { product, quantity };

  const updatedItems = [...state.user.inventory.cart.items!, newItem];

  state.user.inventory.cart.items = updatedItems;
  state.user.inventory.cart.count = updatedItems.length;
  state.user.inventory.cart.total = updatedItems.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
};

//---REMOVE
export const removeFromUserCart = (
  state: InventoryStateProps,
  { payload }: { payload: Product }
) => {
  const updatedItems = state.user.inventory.cart.items!.filter(
    (item) => item.product.slug !== payload.slug
  );

  state.user.inventory.cart.items = updatedItems;
  state.user.inventory.cart.count = updatedItems.length;
  state.user.inventory.cart.total = updatedItems.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
};

// ---CHANGE QUANTITY
export const changeUserCartItemQuantity = (
  state: InventoryState,
  { payload }: { payload: CartItem }
) => {
  const { product, quantity } = payload;
  const updatedCart = state.user.inventory.cart.items!.map((item) => {
    if (item.product.slug === product.slug) {
      return {
        ...item,
        quantity,
      };
    }
    return item;
  });
  state.user.inventory.cart.items = updatedCart;
  state.user.inventory.cart.count = updatedCart.length;
  state.user.inventory.cart.total = updatedCart.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);
};
