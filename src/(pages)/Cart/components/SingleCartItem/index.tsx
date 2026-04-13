'use client';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { RemoveIcon } from '@/assets/images/icons';

import { CartItem } from '@/types';

import { getPriceDisplay, getProductPrice } from '@/helpers';

import { useAppDispatch } from '@/store/hooks';
import { changeLocalCartItemQuantity } from '@/store/inventory';
import { useCart } from '@/hooks';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

interface Props {
  item: CartItem;
  setLetCheckout: Dispatch<SetStateAction<boolean>>;
}

const SingleCartItem = ({ item, setLetCheckout }: Props) => {
  const dispatch = useAppDispatch();
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const { handleClickQuantity, toggleCart } = useCart();

  const [quantity, setQuantity] = useState<string>(
    item.quantity.toString() || ''
  );

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === '' || /^\d+$/.test(newValue)) {
      setQuantity(newValue);
    }
  };

  const updateQuantity = (newQuantity: string) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    if (false) {
      // dispatch(
      //   updateUserCartItemQuantity({
      //     product: item.product.slug,
      //     quantity:
      //       quantity >= item.product.quantity
      //         ? item.product.quantity
      //         : quantity,
      //   })
      // );
    } else {
      dispatch(
        changeLocalCartItemQuantity({
          product: item.product,
          quantity: quantity,
        })
      );
    }
  };

  const blocking = quantity === '' || inputFocused;

  const handleBlur = () => {
    let corrected = quantity;
    if (quantity === '' || quantity === '0') {
      corrected = '1';
    } else if (+quantity >= item.product.quantity) {
      corrected = item.product.quantity.toString();
    }
    setQuantity(corrected);
    updateQuantity(corrected);
    setInputFocused(false);
  };

  useEffect(() => {
    if (blocking) {
      setLetCheckout(false);
    } else {
      setLetCheckout(true);
    }
  }, [quantity, inputFocused]);

  return (
    <tr>
      <td>
        <div className="shopping-cart__product-item">
          <Link href={`/products/${item.product.slug}`}>
            <Image
              loading="lazy"
              src={item.product.images[0].url}
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
            onFocus={() => setInputFocused(true)}
            onBlur={handleBlur}
            min={1}
            className="qty-control__number text-center "
          />

          <button
            disabled={blocking}
            className="qty-control__reduce btn bg-transparent"
            onClick={() => handleClickQuantity(item, '-', setQuantity)}
          >
            -
          </button>

          <button
            disabled={blocking || +quantity >= item.product.quantity}
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
          onClick={() => toggleCart(item.product)}
          className="remove-cart btn"
        >
          <RemoveIcon />
        </button>
      </td>
    </tr>
  );
};

export default SingleCartItem;
