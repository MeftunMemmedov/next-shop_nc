'use client';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';

const CartBtn = ({ product }: { product: Product }) => {
  const { toggleCart, inCart } = useCart();
  const productInCart = inCart(product);

  return (
    <button
      className="pc__atc btn anim_appear-bottom btn position-absolute border-0 text-uppercase fw-medium"
      onClick={() => toggleCart(product)}
    >
      {product.quantity === 0 ? (
        <span className="text-danger">Out of stock</span>
      ) : productInCart ? (
        'Remove from cart'
      ) : (
        'Add to cart'
      )}
    </button>
  );
};

export default CartBtn;
