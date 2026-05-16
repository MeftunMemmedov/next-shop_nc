'use client';
import { HeartActiveIcon, HeartIcon } from '@/assets/images/icons';
import { useWishlist } from '@/hooks';
import { Product } from '@/types';

const WishlistToggle = ({ product }: { product: Product }) => {
  const { inWishlist, toggleWishlist, isPending } = useWishlist();

  const isProductInWishlist = inWishlist(product);

  return (
    <button
      suppressHydrationWarning
      className="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0"
      disabled={isPending}
      onClick={() => toggleWishlist(product)}>
      {isProductInWishlist ? <HeartActiveIcon /> : <HeartIcon />}
    </button>
  );
};

export default WishlistToggle;
