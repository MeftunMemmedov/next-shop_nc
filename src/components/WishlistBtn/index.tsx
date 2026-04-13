'use client';
import { HeartActiveIcon, HeartIcon } from '@/assets/images/icons';
import { useWishlist } from '@/hooks';
import { Product } from '@/types';

const WishlistBtn = ({ product }: { product: Product }) => {
  const { inWishlist, toggleWishlist } = useWishlist();
  const isProductInWishlist = inWishlist(product);
  return (
    <button
      className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 ${isProductInWishlist ? 'active' : ''}`}
      onClick={() => toggleWishlist(product)}
    >
      {isProductInWishlist ? <HeartActiveIcon /> : <HeartIcon />}
    </button>
  );
};

export default WishlistBtn;
