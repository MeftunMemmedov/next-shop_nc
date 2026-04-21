'use client';
import { useEffect, useState, useTransition } from 'react';
import SingleCartItem from './components/SingleCartItem';
import { useCart } from '@/hooks';
import CheckoutSteps from '@/components/CheckoutSteps';
import { Link } from '@/i18n/routing';
import { getPriceDisplay } from '@/helpers';
import { revalidateCartData } from '@/actions/cart';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const [letCheckout, setLetCheckout] = useState<boolean>(false);
  const router = useRouter();
  const {
    items: cartItems,
    count: cartCount,
    total: cartTotal,
    isPending,
  } = useCart();
  const columns = ['Product', '', 'Price', 'Quantity', 'Total'];
  const [, startTransition] = useTransition();
  useEffect(() => {
    startTransition(() => {
      revalidateCartData();
      router.refresh();
    });
  }, []);
  return (
    <main>
      <div className="mb-4 pb-5" />

      <section className="shop-checkout container mb-5">
        <h2 className="page-title text-sm-start text-center">Cart</h2>

        <CheckoutSteps currentStep={1} />

        {cartCount === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <h2 className="text-center">Cart is Empty</h2>

            <Link
              href="/products"
              className="btn btn-dark mt-2 fs-6 go-to-shop-btn position-relative"
            >
              Discover shop
            </Link>
          </div>
        ) : (
          <div className="shopping-cart">
            <div className="cart-table__wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    {columns.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                    <th />
                  </tr>
                </thead>

                <tbody>
                  {cartItems?.map((item) => (
                    <SingleCartItem
                      item={item}
                      key={`cart-item-${item.product.slug}`}
                      setLetCheckout={setLetCheckout}
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
                      // onClick={() => {
                      //   if (isAuth) {
                      //     navigate('/checkout');
                      //   } else {
                      //     navigate('/login');
                      //   }
                      // }}
                      disabled={!letCheckout || isPending}
                      className="btn btn-primary btn-checkout d-flex justify-content-center align-items-center"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Cart;
