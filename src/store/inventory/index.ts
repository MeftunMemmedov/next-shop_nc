import { createSlice } from '@reduxjs/toolkit';

import * as UserActions from './actions/user';
import * as LocalCartActions from './actions/local/cart';
import * as LocalWishlistActions from './actions/local/wishlist';
import * as UserCartActions from './actions/user/cart';

import { CartItem, InventoryStateProps, Product } from '@/types';

import { getProductPrice } from '@/helpers';
import { initialStatus } from '@/constants/status';
// import { getCart, getUserInfo } from './actions/async/thunks';
// import {
//   getCartActions,
//   getUserInfoActions,
// } from './actions/async/thunks/actions/cart';

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
    isAuth: false,
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
  status: {
    user: initialStatus,
    cart: initialStatus,
  },
};

export const slice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    initUser: UserActions.initUser,
    clearUser: UserActions.clearUser,
    updateUser: UserActions.updateUser,
    // -------------------------------------------------------------------- //
    // --------------------------------CART--------------------------------//
    // ------LOCAL CART ACTIONS-------//
    clearLocalCart: LocalCartActions.clearLocalCart,
    addToLocalCart: LocalCartActions.addToLocalCart,
    removeFromLocalCart: LocalCartActions.removeFromLocalCart,
    changeLocalCartItemQuantity: LocalCartActions.changeLocalCartItemQuantity,
    // ------USER CART ACTIONS-------//
    initUserCart: UserCartActions.initUserCart,
    clearUserCart: UserCartActions.clearUserCart,
    addToUserCart: UserCartActions.addToUserCart,
    removeFromUserCart: UserCartActions.removeFromUserCart,
    changeUserCartItemQuantity: UserCartActions.changeUserCartItemQuantity,
    // -------------------------------------------------------------------- //
    // --------------------------------WISHLIST--------------------------------//
    // ----LOCAL WISHLIST ACTIONS----//
    clearLocalWishlist: LocalWishlistActions.clearLocalWishlist,
    addToLocalWishlist: LocalWishlistActions.addToLocalWishlist,
    removeFromLocalWishlist: LocalWishlistActions.removeFromLocalWishlist,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getUserInfo.pending, getUserInfoActions.pending)
  //     .addCase(getUserInfo.fulfilled, getUserInfoActions.fulfilled)
  //     .addCase(getUserInfo.rejected, getUserInfoActions.rejected);
  //   builder
  //     .addCase(getCart.pending, getCartActions.pending)
  //     .addCase(getCart.fulfilled, getCartActions.fulfilled)
  //     .addCase(getCart.rejected, getCartActions.rejected);
  // },
});

export const {
  // CART
  // --LOCAL
  clearLocalCart,
  addToLocalCart,
  removeFromLocalCart,
  changeLocalCartItemQuantity,
  // --USER
  initUser,
  clearUser,
  updateUser,
  // ---USER CART
  initUserCart,
  clearUserCart,
  addToUserCart,
  removeFromUserCart,
  changeUserCartItemQuantity,
  // WISHLIST
  // --LOCAL
  clearLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
} = slice.actions;
export default slice.reducer;
