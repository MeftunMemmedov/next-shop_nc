'use client';
import { useCart } from '@/hooks';
import { Product } from '@/types';

const CartBtn = ({ product }: { product: Product }) => {
  const { toggleCart, inCart, isPending } = useCart();
  const productInCart = inCart(product);

  return (
    <div>
      <button
        disabled={isPending}
        className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium"
        onClick={() => toggleCart(product, 1)}
      >
        {productInCart ? 'REMOVE' : 'ADD TO CART'}
      </button>
    </div>
  );
};

export default CartBtn;
