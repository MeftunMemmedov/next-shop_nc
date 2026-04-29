'use client';
import { Provider } from 'react-redux';

import { makeStore } from './';
import { CartItem, UserAuthState } from '@/types';
import { initUser, initUserCart } from './inventory';

interface Props {
  children: React.ReactNode;
  user: UserAuthState | null;
  cart: CartItem[] | null;
}

const ReduxProvider = ({ children, user, cart }: Props) => {
  const store = makeStore();

  if (user) store.dispatch(initUser(user));
  if (cart) store.dispatch(initUserCart(cart));

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
