'use client';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from './';
import { CartItem, UserAuthState, WishlistItem } from '@/types';
import {
  initLocalCart,
  initLocalWishlist,
  initUser,
  initUserCart,
  initUserWishlist,
} from './inventory';
import { useEffect, useRef } from 'react';

interface Props {
  children: React.ReactNode;
  user: UserAuthState | null;
  cart: CartItem[] | null;
  wishlist: WishlistItem[] | null;
}

const ReduxProvider = ({ children, user, cart, wishlist }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  // eslint-disable-next-line react-hooks/refs
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  // eslint-disable-next-line react-hooks/refs
  const store = storeRef.current;

  useEffect(() => {
    if (user) {
      store.dispatch(initUser(user));
      if (cart) store.dispatch(initUserCart(cart));
      if (wishlist) store.dispatch(initUserWishlist(wishlist));
      return;
    } else {
      store.dispatch(initLocalWishlist());
      store.dispatch(initLocalCart());
    }
  }, [user]);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
