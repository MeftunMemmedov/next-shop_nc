'use client';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';

import { RemoveIcon } from '@/assets/images/icons';

import { CartItem, Product } from '@/types';

import { getPriceDisplay, getProductPrice } from '@/helpers';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Props {
  item: CartItem;
  setLetCheckout: Dispatch<SetStateAction<boolean>>;
  isPending: boolean | undefined;
  toggleCart: (product: Product, quantity: number) => void;
  handleClickQuantity: (
    item: CartItem,
    type: '+' | '-',
    setQuantity?: Dispatch<SetStateAction<string>>
  ) => void;
  updateQuantity: (
    product: Product,
    quantity: number,
    func: () => void
  ) => void;
}

const SingleCartItem = ({
  item,
  setLetCheckout,
  toggleCart,
  updateQuantity,
  handleClickQuantity,
  isPending,
}: Props) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<string>(
    item.quantity.toString() || ''
  );

  const prevQuantityVal = useRef<string>(item.quantity.toString());

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setQuantity(newValue);
    }
  };

  const updateQuantityByInput = (newQuantity: string) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    updateQuantity(item.product, quantity, () => {
      setQuantity('1');
      toast.error(`An error occured while cart action.`);
    });
  };

  const blocking = quantity === '' || inputFocused || isPending;

  const handleFocus = () => {
    setLetCheckout(true);
    setInputFocused(true);
    prevQuantityVal.current = quantity;
  };

  const handleBlur = () => {
    let corrected = quantity;
    if (quantity === '' || quantity === '0') {
      corrected = '1';
    }

    if (corrected !== prevQuantityVal.current) {
      updateQuantityByInput(corrected);
    }

    setLetCheckout(false);
    setQuantity(corrected);
    setInputFocused(false);
  };

  return (
    <tr>
      <td>
        <div className="shopping-cart__product-item">
          <Link href={`/products/${item.product.slug}`}>
            <Image
              loading="lazy"
              src={item.product.images[0]}
              width={120}
              height={120}
              alt={item.product.title}
            />
          </Link>
        </div>
      </td>

      <td>
        <div className="shopping-cart__product-item__detail">
          <h4>
            <Link href={`/products/${item.product.slug}`}>
              {item.product.title}
            </Link>
          </h4>

          <ul className="shopping-cart__product-item__options">
            <li>Category: {item.product.category.title}</li>
          </ul>
        </div>
      </td>

      <td className="ps-2">
        {item.product.discount > 0 && (
          <div className="shopping-cart__product-price text-decoration-line-through">
            {getPriceDisplay(+item.product.price)}
          </div>
        )}

        <div className="shopping-cart__product-price">
          {getPriceDisplay(item.product)}
        </div>
      </td>

      <td>
        <div></div>
        <div className="qty-control position-relative">
          <input
            type="text"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            min={1}
            className="qty-control__number text-center "
          />

          <button
            disabled={blocking || +quantity === 1}
            className="qty-control__reduce btn bg-transparent"
            onClick={() => handleClickQuantity(item, '-', setQuantity)}
          >
            -
          </button>

          <button
            disabled={blocking}
            className="qty-control__increase  btn bg-transparent"
            onClick={() => handleClickQuantity(item, '+', setQuantity)}
          >
            +
          </button>
        </div>
        <p className="position-absolute end-0 bottom-0 text-center m-0">
          Quantity: {item.product.quantity}
        </p>
      </td>

      <td>
        <div className="d-flex flex-column justify-content-center align-items-end ">
          <div className="shopping-cart__subtotal text-center">
            {getPriceDisplay(getProductPrice(item.product) * item.quantity)}
          </div>
        </div>
      </td>

      <td>
        <button
          onClick={() => toggleCart(item.product, 0)}
          className="remove-cart btn"
        >
          <RemoveIcon />
        </button>
      </td>
    </tr>
  );
};

export default SingleCartItem;
