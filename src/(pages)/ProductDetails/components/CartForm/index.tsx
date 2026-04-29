'use client';
import { ChangeEvent, useState } from 'react';

import { CartItem, Product } from '@/types';

import { useCart } from '@/hooks';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/store/hooks';
import Spinner from '@/components/Spinner';

interface Props {
  product: Product;
}

const CartForm = ({ product }: Props) => {
  const {
    status: {
      cart: { loading: isLoading },
    },
  } = useAppSelector((store) => store.inventory);
  const { items, inCart, toggleCart, updateQuantity, isPending } = useCart();

  const productInCart: CartItem | undefined = items?.find(
    (item) => item.product.id === product.id
  );

  // const [mounted, setMounted] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<string>(
    () => productInCart?.quantity.toString() || '1'
  );

  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const MIN_QUANTITY = 1;

  const isProductInCart = inCart(product);
  const isQuantityChanged =
    isProductInCart && productInCart?.quantity !== +quantity;

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setQuantity('');
      return;
    }

    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(quantity);
    if (quantity === '' || isNaN(numValue) || numValue < MIN_QUANTITY) {
      setQuantity(MIN_QUANTITY.toString());
    }
    setInputFocused(false);
  };

  const increaseQuantity = () => {
    const current = +quantity || 0;
    setQuantity((current + 1).toString());
  };

  const decreaseQuantity = () => {
    const current = +quantity || 0;
    if (current > MIN_QUANTITY) {
      setQuantity((current - 1).toString());
    }
  };

  const handleAddOrUpdateCart = () => {
    const qty = +quantity || MIN_QUANTITY;
    toggleCart(product, qty);
  };

  const handleUpdateQuantity = () => {
    const qty = +quantity || MIN_QUANTITY;
    if (isProductInCart && isQuantityChanged) {
      updateQuantity(product, qty, () => {
        setQuantity('1');
        toast.error(`An error occured while cart action`);
      });
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <div className="product-single__addtocart d-flex flex-sm-row flex-column align-items-start">
      <div className="qty-control position-relative">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          name="quantity"
          value={quantity}
          onFocus={() => setInputFocused(true)}
          onChange={handleQuantityChange}
          onBlur={handleBlur}
          className="qty-control__number text-center"
          disabled={isPending || isLoading}
        />

        <button
          type="button"
          className="qty-control__reduce btn bg-transparent"
          onClick={decreaseQuantity}
          disabled={
            +quantity <= MIN_QUANTITY || inputFocused || isPending || isLoading
          }
        >
          -
        </button>

        <button
          type="button"
          className="qty-control__increase btn bg-transparent"
          onClick={increaseQuantity}
          disabled={inputFocused || isPending || isLoading}
        >
          +
        </button>
      </div>

      <div className="button-group d-flex flex-column gap-2">
        <button
          type="button"
          className={`btn btn-${isProductInCart ? 'danger' : 'primary'} btn-addtocart`}
          onClick={handleAddOrUpdateCart}
        >
          {isProductInCart ? 'Remove from cart' : 'Add to cart'}
        </button>

        {isQuantityChanged && (
          <button
            type="button"
            className="btn btn-primary btn-addtocart"
            disabled={isPending || isPending}
            onClick={handleUpdateQuantity}
          >
            {isPending ? 'UPDATING...' : 'Update Quantity'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartForm;
