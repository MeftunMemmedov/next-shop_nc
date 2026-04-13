import { Dispatch, SetStateAction } from 'react';

import { toast } from 'react-toastify';

import { CartItem, Product } from '@/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToLocalCart,
  changeLocalCartItemQuantity,
  removeFromLocalCart,
} from '@/store/inventory';

const useCart = () => {
  const dispatch = useAppDispatch();
  const { local } = useAppSelector((store) => store.inventory);

  // --------------------------------LOCAL ---------------------------------------------//
  const {
    items: localCartItems,
    count: localCartCount,
    total: localCartTotal,
  } = local.cart;

  const inLocalCart = (product: Product): boolean => {
    return localCartItems.some((item) => item.product.slug === product.slug);
  };

  const toggleLocalCart = (product: Product, quantity: number = 1) => {
    if (inLocalCart(product)) {
      dispatch(removeFromLocalCart(product));
      toast.error(`${product.title} removed from cart`);
    } else {
      dispatch(addToLocalCart({ product: product, quantity: quantity }));
      toast.success(`${product.title} added to cart`);
    }
  };

  const handleClickLocalQuantity = (
    item: CartItem,
    type: '+' | '-',
    setQuantity?: Dispatch<SetStateAction<string>>
  ) => {
    const newQuantity = type === '+' ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) return;

    dispatch(
      changeLocalCartItemQuantity({
        product: item.product,
        quantity: newQuantity,
      })
    );

    if (setQuantity) {
      setQuantity(newQuantity.toString());
    }
  };

  return {
    items: localCartItems,
    count: localCartCount,
    total: localCartTotal,
    inCart: inLocalCart,
    toggleCart: toggleLocalCart,
    handleClickQuantity: handleClickLocalQuantity,
  };
};

export default useCart;
