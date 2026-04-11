'use client';
import { ShoppingIcon } from '@/assets/images/icons';
import { getPriceDisplay, getProductPrice } from '@/helpers';
import { useCart } from '@/hooks/useCart';
import { Link } from '@/i18n/routing';
import { useState } from 'react';

const CartModal = () => {
  const [isCartModalVisible, setIsCartModalVisible] = useState<boolean>(false);

  const {
    items: cartItems,
    count: cartCount,
    total,
    toggleCart,
    handleClickQuantity,
  } = useCart();

  return (
    <>
      <div
        className={`page-overlay ${isCartModalVisible ? 'page-overlay_visible' : ''}`}
        onClick={() => setIsCartModalVisible(false)}
      ></div>
      <button
        onClick={() => setIsCartModalVisible(true)}
        className="header-tools__item header-tools__cart btn"
      >
        <ShoppingIcon />
        <span
          className="cart-amount d-block position-absolute"
          suppressHydrationWarning
        >
          {cartCount}
        </span>
      </button>
      <div
        className={`aside aside_right overflow-hidden cart-drawer ${isCartModalVisible ? 'aside_visible' : ''}`}
      >
        <div className="aside-header d-flex align-items-center">
          <h3 className="text-uppercase fs-6 mb-0">
            Cart
            <span className="cart-amount" suppressHydrationWarning>
              ({cartCount})
            </span>
          </h3>

          <button
            className="btn-close-lg btn-close-aside ms-auto"
            onClick={() => setIsCartModalVisible(false)}
          />
        </div>

        <div className="aside-content cart-drawer-items-list">
          {cartCount === 0 ? (
            <h2 className="text-center">Cart is empty</h2>
          ) : (
            cartItems?.map((item) => (
              <div
                className="cart-drawer-item d-flex position-relative my-3"
                key={`cart-modal-item-${item.product.slug}`}
              >
                <div className="position-relative">
                  <Link href={`/products/${item.product.slug}`}>
                    <img
                      loading="lazy"
                      className="cart-drawer-item__img"
                      src={item.product.images[0]}
                      alt={item.product.title}
                    />
                  </Link>
                </div>

                <div className="cart-drawer-item__info flex-grow-1 pe-2">
                  <h6 className="cart-drawer-item__title fw-normal">
                    <Link href={`/products/${item.product.slug}`}>
                      {item?.product?.title}
                    </Link>
                  </h6>

                  <div className="d-flex flex-sm-row flex-column align-items-sm-center justify-content-between mt-1 gap-2">
                    <div className="qty-control position-relative">
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        readOnly
                        min={1}
                        className="qty-control__number border-0 text-center"
                      />

                      <button
                        className="btn qty-control__reduce text-start"
                        onClick={() => handleClickQuantity(item, '-')}
                      >
                        -
                      </button>

                      <button
                        className="btn qty-control__increase text-end"
                        onClick={() => handleClickQuantity(item, '+')}
                      >
                        +
                      </button>
                    </div>

                    <span className="d-flex flex-column">
                      {item.product.discount > 0 && (
                        <span className="cart-drawer-item__discount-price text-decoration-line-through">
                          {getPriceDisplay(+item.product.price * item.quantity)}
                        </span>
                      )}

                      <span className="cart-drawer-item__price money price">
                        {getPriceDisplay(
                          getProductPrice(item.product) * item.quantity
                        )}
                      </span>
                    </span>
                  </div>
                </div>

                <button
                  className="btn-close-xs position-absolute top-0 end-0"
                  onClick={() => toggleCart(item.product)}
                />
              </div>
            ))
          )}
        </div>

        <div className="cart-drawer-actions position-absolute start-0 bottom-0 w-100">
          <hr className="cart-drawer-divider" />
          <div className="d-flex justify-content-between">
            <h6 className="fs-base fw-medium">Subtotal:</h6>
            <span className="cart-subtotal fw-medium">
              {getPriceDisplay(total)}
            </span>
          </div>

          <Link
            onClick={() => setIsCartModalVisible(false)}
            href="/cart"
            className="btn btn-light mt-3 d-block"
          >
            View Cart
          </Link>

          <Link
            onClick={() => setIsCartModalVisible(false)}
            href={true ? '/checkout' : '/login'}
            className="btn btn-primary mt-3 d-block"
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartModal;
