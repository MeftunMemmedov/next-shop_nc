'use client';
import { Provider } from 'react-redux';

import { makeStore } from './';
import { CartItem, UserAuthState, WishlistItem } from '@/types';
import {
  initLocalCart,
  initLocalWishlist,
  initUser,
  initUserCart,
  initUserWishlist,
} from './inventory';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
  user: UserAuthState | null;
  cart: CartItem[] | null;
  wishlist: WishlistItem[] | null;
}

const ReduxProvider = ({ children, user, cart, wishlist }: Props) => {
  const [store] = useState(() => {
    const storeInstance = makeStore();

    if (user) {
      storeInstance.dispatch(initUser(user));
      if (cart) storeInstance.dispatch(initUserCart(cart));
      if (wishlist) storeInstance.dispatch(initUserWishlist(wishlist));
    } else {
      storeInstance.dispatch(initLocalWishlist());
      storeInstance.dispatch(initLocalCart());
    }
    return storeInstance;
  });

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
