'use client';
import { ShoppingIcon, WishlistIcon } from '@/assets/images/icons';
import Spinner from '@/components/Spinner';
import { blockScreenByTransparentOverlay } from '@/helpers';
import { useCart, useWishlist } from '@/hooks';
import { Link, usePathname } from '@/i18n/routing';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const CartList = dynamic(() => import('./components/CartList'), {
  ssr: false,
  loading: () => <Spinner />,
});

const CartModal = () => {
  const pathname = usePathname();

  const [isCartModalVisible, setIsCartModalVisible] = useState<boolean>(false);

  const { items: cartItems, count: cartCount } = useCart();

  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    blockScreenByTransparentOverlay(isCartModalVisible);
  }, [isCartModalVisible]);
  if (!cartItems) return null;
  return (
    <>
      <div
        className={`page-overlay ${isCartModalVisible ? 'page-overlay_visible' : ''}`}
        onClick={() => setIsCartModalVisible(false)}></div>
      <button
        disabled={
          pathname.endsWith('/checkout/') || pathname.endsWith('/cart/')
        }
        onClick={() => setIsCartModalVisible(true)}
        className="header-tools__item header-tools__cart btn">
        <ShoppingIcon />
        <span
          className="cart-amount d-block position-absolute"
          suppressHydrationWarning>
          {cartCount}
        </span>
      </button>
      <Link
        className="header-tools__item header-tools__cart"
        href="/account/wishlist">
        <WishlistIcon />
        <span className="cart-amount d-block position-absolute">
          {wishlistCount}
        </span>
      </Link>
      <CartList
        isCartModalVisible={isCartModalVisible}
        setIsCartModalVisible={setIsCartModalVisible}
      />
    </>
  );
};

export default CartModal;
