import { toast } from 'react-toastify';

import { Product, WishlistItem } from '@/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToLocalWishlist,
  addToUserWishlist,
  removeFromLocalWishlist,
  removeFromUserWishlist,
} from '@/store/inventory';
import { useTransition } from 'react';
import { toggleWishlistAction } from '@/actions/wishlist';

const useWishlist = (): {
  items: WishlistItem[] | null;
  count: number;
  inWishlist: (product: Product) => boolean | undefined;
  toggleWishlist: (product: Product) => void;
  isPending: boolean;
} => {
  const dispatch = useAppDispatch();
  const { user, local } = useAppSelector((store) => store.inventory);

  // -----------------------------LOCAL-----------------------------//

  const { items: localWishlistItems, count: localWishlistCount } =
    local.wishlist;

  const inLocalWishlist = (product: Product): boolean => {
    return localWishlistItems.some(
      (item) => item.product.slug === product.slug
    );
  };

  const toggleLocalWishlist = (product: Product) => {
    if (inLocalWishlist(product)) {
      dispatch(removeFromLocalWishlist(product));
      toast.error(`${product.title} removed from wishlist`);
    } else {
      dispatch(addToLocalWishlist({ product }));
      toast.success(`${product.title} added to wishlist`);
    }
  };

  // -----------------------------USER-----------------------------//
  const {
    info,
    isAuth,
    inventory: {
      wishlist: { items: userWishlistItems, count: userWishlistCount },
    },
  } = user;

  const [isUserWishlistActionPending, startUserWishlistActionTransition] =
    useTransition();

  const inUserWishlist = (product: Product) =>
    userWishlistItems?.some((item) => item.product.slug === product.slug);

  const toggleUserWishlist = (product: Product) => {
    if (inUserWishlist(product)) {
      dispatch(removeFromUserWishlist(product));
    } else {
      dispatch(addToUserWishlist(product));
    }

    startUserWishlistActionTransition(async () => {
      const currentLyInWishlist = !!inUserWishlist(product);
      if (info) {
        const formData = new FormData();
        formData.append('product', product.id);
        formData.append('user_id', info?.user_id);
        formData.append('intent', currentLyInWishlist ? 'remove' : 'add');
        const res = await toggleWishlistAction(formData);
        const { status, message } = res;
        if (status === 'success') {
          toast.success(`${product.title} | ${message}`);
        }
        if (status === 'failure') {
          toast.error(message);
        }
      }
    });
  };

  if (isAuth)
    return {
      items: userWishlistItems,
      count: userWishlistCount,
      inWishlist: inUserWishlist,
      toggleWishlist: toggleUserWishlist,
      isPending: isUserWishlistActionPending,
    };
  else
    return {
      items: localWishlistItems,
      count: localWishlistCount,
      inWishlist: inLocalWishlist,
      toggleWishlist: toggleLocalWishlist,
      isPending: false,
    };
};
export default useWishlist;
