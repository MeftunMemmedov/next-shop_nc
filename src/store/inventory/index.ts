import { createSlice } from '@reduxjs/toolkit';

import * as UserActions from './actions/user';
import * as LocalCartActions from './actions/local/cart';
import * as LocalWishlistActions from './actions/local/wishlist';
import * as UserCartActions from './actions/user/cart';
import * as UserWishlistActions from './actions/user/wishlist';

import { initialInvetoryState } from './initialState';

export const slice = createSlice({
  name: 'inventory',
  initialState: initialInvetoryState,
  reducers: {
    initUser: UserActions.initUser,
    clearUser: UserActions.clearUser,
    updateUser: UserActions.updateUser,
    // -------------------------------------------------------------------- //
    // --------------------------------CART------------------------------- //
    // ------LOCAL CART ACTIONS-------//
    initLocalCart: LocalCartActions.initLocalCart,
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
    // --------------------------------WISHLIST------------------------------- //
    // -------LOCAL WISHLIST ACTIONS-------//
    initLocalWishlist: LocalWishlistActions.initLocalWishlist,
    clearLocalWishlist: LocalWishlistActions.clearLocalWishlist,
    addToLocalWishlist: LocalWishlistActions.addToLocalWishlist,
    removeFromLocalWishlist: LocalWishlistActions.removeFromLocalWishlist,
    // -------USER WISHLIST ACTIONS------- //
    initUserWishlist: UserWishlistActions.initUserWishlist,
    clearUserWishlist: UserWishlistActions.clearUserWishlist,
    addToUserWishlist: UserWishlistActions.addToUserWishlist,
    removeFromUserWishlist: UserWishlistActions.removeFromUserWishlist,
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
  // --LOCAL CART
  initLocalCart,
  clearLocalCart,
  addToLocalCart,
  removeFromLocalCart,
  changeLocalCartItemQuantity,
  // ---USER CART
  initUserCart,
  clearUserCart,
  addToUserCart,
  removeFromUserCart,
  changeUserCartItemQuantity,
  // WISHLIST
  // --LOCAL WISHLIST
  initLocalWishlist,
  clearLocalWishlist,
  addToLocalWishlist,
  removeFromLocalWishlist,
  // --USER WISHLIST
  initUserWishlist,
  clearUserWishlist,
  addToUserWishlist,
  removeFromUserWishlist,
  // USER
  initUser,
  clearUser,
  updateUser,
} = slice.actions;
export default slice.reducer;
