'use client';

import { setCategory } from '@/store/data';
import { useAppDispatch } from '@/store/hooks';
import { setUserCart, setUserInfo } from '@/store/inventory';
import { CartItem, Category, User } from '@/types';
import { useEffect } from 'react';

const Dispatches = ({
  categories,
  cartData,
  user,
}: {
  categories: Category[];
  cartData: CartItem[] | null;
  user: User | null;
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) dispatch(setUserInfo(user));
  }, [user]);

  useEffect(() => {
    if (cartData) dispatch(setUserCart(cartData));
  }, [cartData]);

  useEffect(() => {
    if (categories) dispatch(setCategory(categories));
  }, [categories]);
  return null;
};

export default Dispatches;
