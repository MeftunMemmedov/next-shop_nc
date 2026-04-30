'use client';
import { Provider } from 'react-redux';

import { makeStore } from './';
import { CartItem, UserAuthState, WishlistItem } from '@/types';
import { initUser, initUserCart, initUserWishlist } from './inventory';

interface Props {
  children: React.ReactNode;
  user: UserAuthState | null;
  cart: CartItem[] | null;
  wishlist: WishlistItem[] | null;
}

const ReduxProvider = ({ children, user, cart, wishlist }: Props) => {
  const store = makeStore();

  if (user) store.dispatch(initUser(user));
  if (cart) store.dispatch(initUserCart(cart));
  if (wishlist) store.dispatch(initUserWishlist(wishlist));

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
