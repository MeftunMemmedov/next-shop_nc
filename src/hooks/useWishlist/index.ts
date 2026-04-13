import { toast } from 'react-toastify';

import { Product } from '@/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToLocalWishlist, removeFromLocalWishlist } from '@/store/inventory';

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { local } = useAppSelector((store) => store.inventory);

  // -----------------------------LOCAL-----------------------------//

  const { items: localWishlistItems, count: localWishlistCount } =
    local.wishlist;

  const inLocalWishlist = (product: Product): boolean => {
    return localWishlistItems.some((item) => item.slug === product.slug);
  };

  const toggleLocalWishlist = (product: Product) => {
    if (inLocalWishlist(product)) {
      dispatch(removeFromLocalWishlist(product));
      toast.error(`${product.title} removed from wishlist`);
    } else {
      dispatch(addToLocalWishlist(product));
      toast.success(`${product.title} added to wishlist`);
    }
  };

  return {
    items: localWishlistItems,
    count: localWishlistCount,
    inWishlist: inLocalWishlist,
    toggleWishlist: toggleLocalWishlist,
  };
};
export default useWishlist;
