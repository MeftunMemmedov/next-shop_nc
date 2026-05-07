'use client';
import { HeartActiveIcon, HeartIcon } from '@/assets/images/icons';
import { useWishlist } from '@/hooks';
import { Product } from '@/types';
import { useEffect, useState } from 'react';

const WishlistBtn = ({ product }: { product: Product }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { inWishlist, toggleWishlist, isPending } = useWishlist();
  const isProductInWishlist = inWishlist(product);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <button
      suppressHydrationWarning
      className="pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0"
      disabled={isPending}
      onClick={() => toggleWishlist(product)}>
      {isProductInWishlist ? (
        <HeartActiveIcon suppressHydrationWarning />
      ) : (
        <HeartIcon suppressHydrationWarning />
      )}
    </button>
  );
};

export default WishlistBtn;
