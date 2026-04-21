'use client';
import { useCart } from '@/hooks';
import { Product } from '@/types';
import { useEffect } from 'react';

const CartBtn = ({ product }: { product: Product }) => {
  const { toggleCart, inCart, actionState, isPending } = useCart();
  const productInCart = inCart(product);

  const handleCart = () => {
    toggleCart(product, 1);
  };

  useEffect(() => {
    if (actionState === null) return;
    if (actionState?.status === 'failure') {
      toggleCart(product, 1);
    }
  }, [actionState]);
  return (
    <div>
      <button
        disabled={isPending}
        type="submit"
        className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium"
        onClick={handleCart}
      >
        {productInCart ? 'REMOVE' : 'ADD TO CART'}
      </button>
      {actionState?.status === 'failure' && <p>{actionState.message}</p>}
    </div>
  );
};

export default CartBtn;
