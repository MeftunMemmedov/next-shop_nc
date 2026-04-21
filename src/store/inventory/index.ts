'use client';
import { createSlice } from '@reduxjs/toolkit';

import * as LocalActions from './actions/local';
import * as UserActions from './actions/user';

import { CartItem, InventoryStateProps, Product } from '@/types';

import { getProductPrice } from '@/helpers';

const localCartData =
  typeof window !== 'undefined' && localStorage.getItem('cart');
const localCart = localCartData
  ? (JSON.parse(localCartData) as CartItem[])
  : [];

const localWishlistData =
  typeof window !== 'undefined' && localStorage.getItem('wishlist');
const localWishlist = localWishlistData
  ? (JSON.parse(localWishlistData) as Product[])
  : [];

const initialState: InventoryStateProps = {
  local: {
    cart: {
      items: localCart,
      count: localCart.length,
      total: localCart.reduce((acc, item) => {
        return acc + getProductPrice(item?.product) * item.quantity;
      }, 0),
    },
    wishlist: {
      items: localWishlist,
      count: localWishlist.length,
    },
  },
  user: {
    info: null,
    inventory: {
      cart: {
        items: null,
        count: 0,
        total: 0,
      },
      wishlist: {
        items: null,
        count: 0,
      },
    },
  },
};

export const slice = createSlice({
  name: 'inventory',
  initialState,
  //   -----//LOCAL ACTIONS//-----//
  reducers: {
    // ------LOCAL CART ACTIONS-------//
    setUserInfo: (state, { payload }) => {
      state.user.info = payload;
    },
    clearLocalCart: LocalActions.clearCart,
    addToLocalCart: LocalActions.addToLocalCart,
    removeFromLocalCart: LocalActions.removeFromLocalCart,
    changeLocalCartItemQuantity: LocalActions.changeLocalCartItemQuantity,

    // ------USER CART ACTIONS-------//
    setUserCart: (state, { payload }: { payload: CartItem[] }) => {
      state.user.inventory.cart.items = payload;
      state.user.inventory.cart.count = payload.length;
      state.user.inventory.cart.total = payload.reduce((acc, item) => {
        return acc + getProductPrice(item.product) * item.quantity;
      }, 0);
    },
    addToUserCart: UserActions.addToUserCart,
    removeFromUserCart: UserActions.removeFromUserCart,
    changeUserCartItemQuantity: UserActions.changeUserCartItemQuantity,
    // ----WISHLIST ACTIONS----//
    clearLocalWishlist: LocalActions.clearLocalWishlist,
    addToLocalWishlist: LocalActions.addToLocalWishlist,
    removeFromLocalWishlist: LocalActions.removeFromLocalWishlist,
  },
});

export const {
  setUserInfo,
  // CART
  // --LOCAL
  clearLocalCart,
  addToLocalCart,
  removeFromLocalCart,
  changeLocalCartItemQuantity,
  // --USER
  setUserCart,
  addToUserCart,
  removeFromUserCart,
  changeUserCartItemQuantity,
  // WISHLIST
  clearLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
} = slice.actions;
export default slice.reducer;
