'use client';
import { ChangeEvent, useState } from 'react';

import { CartItem, Product } from '@/types';

import { useAppDispatch } from '@/store/hooks';
import { changeLocalCartItemQuantity } from '@/store/inventory';

import { useCart } from '@/hooks';
import Spinner from '@/components/Spinner';

interface Props {
  product: Product;
  isAuth?: boolean;
}

const CartForm = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const { items, inCart, toggleCart } = useCart();

  const productInCart = (): CartItem =>
    items?.find((item) => item.product.slug === product.slug);

  const [quantity, setQuantity] = useState<string>(
    () => productInCart()?.quantity.toString() || '1'
  );

  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const MIN_QUANTITY = 1;
  const MAX_QUANTITY = product.quantity || 0;

  const isProductInCart = inCart(product);
  const isQuantityChanged =
    isProductInCart && productInCart()?.quantity !== parseInt(quantity);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setQuantity('');
      return;
    }

    if (/^\d*$/.test(value)) {
      const numValue = parseInt(value, 10);

      if (!isNaN(numValue) && numValue >= MIN_QUANTITY) {
        setQuantity(value);
      } else if (value === '') {
        setQuantity('');
      }
    }
  };

  const handleBlur = () => {
    if (quantity === '' || parseInt(quantity) < MIN_QUANTITY) {
      setQuantity(MIN_QUANTITY.toString());
    } else if (parseInt(quantity) > MAX_QUANTITY) {
      setQuantity(MAX_QUANTITY.toString());
    }
    setInputFocused(false);
  };

  const increaseQuantity = () => {
    const newQuantity = Math.min((parseInt(quantity) || 0) + 1, MAX_QUANTITY);
    setQuantity(newQuantity.toString());
  };

  const decreaseQuantity = () => {
    const newQuantity = Math.max((parseInt(quantity) || 0) - 1, MIN_QUANTITY);
    setQuantity(newQuantity.toString());
  };

  const handleAddOrUpdateCart = () => {
    const qty = parseInt(quantity) || MIN_QUANTITY;
    toggleCart(product, qty);
  };

  const handleUpdateQuantity = () => {
    const qty = parseInt(quantity) || MIN_QUANTITY;
    if (isProductInCart && isQuantityChanged) {
      if (false) {
        // dispatch(
        //   updateUserCartItemQuantity({ product: product.slug, quantity: qty })
        // );
      } else {
        dispatch(changeLocalCartItemQuantity({ product, quantity: qty }));
      }
    }
  };

  return (
    <div className="product-single__addtocart d-flex flex-sm-row flex-column align-items-start">
      <div className="qty-control position-relative">
        {false ? (
          <Spinner size={30} />
        ) : (
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            min={MIN_QUANTITY}
            name="quantity"
            value={quantity}
            onFocus={() => setInputFocused(true)}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            className="qty-control__number text-center"
          />
        )}

        <button
          type="button"
          className="qty-control__reduce btn bg-transparent"
          onClick={decreaseQuantity}
          disabled={parseInt(quantity) <= MIN_QUANTITY || inputFocused}
        >
          -
        </button>

        <button
          type="button"
          className="qty-control__increase btn bg-transparent"
          onClick={increaseQuantity}
          disabled={parseInt(quantity) >= MAX_QUANTITY || inputFocused}
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
          {false ? (
            <Spinner size={10} />
          ) : isProductInCart ? (
            'Remove from cart'
          ) : (
            'Add to cart'
          )}
        </button>

        {isQuantityChanged && (
          <button
            type="button"
            className="btn btn-primary btn-addtocart"
            onClick={handleUpdateQuantity}
          >
            {false ? <Spinner size={15} /> : 'Update Quantity'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartForm;
