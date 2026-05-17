'use client';
import { useState } from 'react';
import { useCart } from '@/hooks';
import { Link, useRouter } from '@/i18n/routing';
import { getPriceDisplay } from '@/helpers';
import { useAppSelector } from '@/store/hooks';
import SingleCartItem from './components/SingleCartItem';

const CartList = () => {
  const router = useRouter();

  const {
    user: { isAuth },
  } = useAppSelector((store) => store.inventory);

  const {
    items: cartItems,
    count: cartCount,
    total: cartTotal,
    handleClickQuantity,
    toggleCart,
    updateQuantity,
    loadingIds,
  } = useCart();

  const columns = ['Product', '', 'Price', 'Quantity', 'Total'];

  const [letCheckout, setLetCheckout] = useState<boolean>(false);

  const isPending = !!loadingIds && loadingIds.size > 0;
  return (
    <>
      {cartCount === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <h2 className="text-center">Cart is Empty</h2>

          <Link
            href="/products"
            className="btn btn-dark mt-2 fs-6 go-to-shop-btn position-relative">
            Discover shop
          </Link>
        </div>
      ) : (
        <div className="shopping-cart">
          <div className="cart-table__wrapper">
            <table className="cart-table">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={`${column}-${index}`}>{column}</th>
                  ))}
                  <th />
                </tr>
              </thead>

              <tbody>
                {cartItems?.map((item) => (
                  <SingleCartItem
                    key={`cart-item-${item.product.slug}`}
                    item={item}
                    setLetCheckout={setLetCheckout}
                    handleClickQuantity={handleClickQuantity}
                    toggleCart={toggleCart}
                    updateQuantity={updateQuantity}
                    loadingIds={loadingIds}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="shopping-cart__totals-wrapper">
            <div className="sticky-content">
              <div className="shopping-cart__totals">
                <h3>Totals</h3>
                <table className="cart-totals">
                  <tbody>
                    {/* <tr>
                        <th>{tCommon('cart.sub_total')}</th>
                        <td>{getPriceDisplay(cartTotal)}</td>
                      </tr> */}

                    <tr>
                      <th>Total</th>
                      <td>{getPriceDisplay(cartTotal)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mobile_fixed-btn_wrapper">
                <div className="button-wrapper container">
                  <button
                    onClick={() => {
                      if (isAuth) {
                        router.push('/checkout');
                      } else {
                        router.push('/auth/signin');
                      }
                    }}
                    disabled={letCheckout || isPending}
                    className="btn btn-primary btn-checkout d-flex justify-content-center align-items-center">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartList;
