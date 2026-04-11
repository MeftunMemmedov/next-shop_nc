'use client';
import { createSlice } from '@reduxjs/toolkit';

import { initialStatus } from '@/constants/status';

import * as SyncActions from './sync/actions';

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
  status: {
    cart: initialStatus,
    cartAction: initialStatus,
    wishlist: initialStatus,
    wishlistAction: initialStatus,
  },
  errors: {
    cart: null,
    wishlist: null,
  },
};

export const slice = createSlice({
  name: 'inventory',
  initialState,
  //   -----//LOCAL ACTIONS//-----//
  reducers: {
    // ------CART ACTIONS-------//
    clearLocalCart: SyncActions.clearCart,
    addToLocalCart: SyncActions.addToLocalCart,
    removeFromLocalCart: SyncActions.removeFromLocalCart,
    changeLocalCartItemQuantity: SyncActions.changeLocalCartItemQuantity,

    // ----WISHLIST ACTIONS----//
    clearLocalWishlist: SyncActions.clearLocalWishlist,
    addToLocalWishlist: SyncActions.addToLocalWishlist,
    removeFromLocalWishlist: SyncActions.removeFromLocalWishlist,
  },
});

export const {
  // CART
  clearLocalCart,
  addToLocalCart,
  removeFromLocalCart,
  changeLocalCartItemQuantity,
  // WISHLIST
  clearLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
} = slice.actions;
export default slice.reducer;
