'use client';

import { setCategory } from '@/store/data';
import { useAppDispatch } from '@/store/hooks';
import { Category } from '@/types';
import { useEffect } from 'react';

const Dispatches = ({ categories }: { categories: Category[] }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCategory(categories));
  }, [categories]);
  return null;
};

export default Dispatches;
