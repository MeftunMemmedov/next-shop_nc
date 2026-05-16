import { toast } from 'react-toastify';

import { Product, ToggleWishlistActionParams, WishlistHookType } from '@/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToLocalWishlist,
  addToUserWishlist,
  removeFromLocalWishlist,
  removeFromUserWishlist,
} from '@/store/inventory';
import { useTransition } from 'react';
import { toggleWishlistAction } from '@/actions/wishlist';

const useWishlist = (): WishlistHookType => {
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

  const inUserWishlist = (product: Product) =>
    userWishlistItems?.some((item) => item.product.slug === product.slug);

  const [isTogglePending, startToggleTransition] = useTransition();

  const toggleUserWishlist = async (product: Product) => {
    const currentlyInWishlist = !!inUserWishlist(product);

    if (currentlyInWishlist) {
      dispatch(removeFromUserWishlist(product));
      toast.success(`${product.title} removed from wishlist successfully!`);
    } else {
      dispatch(addToUserWishlist(product));
      toast.success(`${product.title} added to wishlist successfully!`);
    }

    if (!info) return;

    startToggleTransition(async () => {
      const rollback = () => {
        if (currentlyInWishlist) {
          dispatch(addToUserWishlist(product));
        } else {
          dispatch(removeFromUserWishlist(product));
        }
      };

      try {
        const toggleWIshlistParams: ToggleWishlistActionParams = {
          product: product.id,
          user_id: info.user_id,
          intent: currentlyInWishlist ? 'remove' : 'add',
        };

        const res = await toggleWishlistAction(toggleWIshlistParams);

        const { status, message } = res;

        if (status === 'failure') {
          toast.error(message);
          rollback();
        }
      } catch {
        toast.error(
          'Something went wrong. Please check your connection and try again!'
        );
        rollback();
      }
    });
  };

  if (isAuth)
    return {
      items: userWishlistItems,
      count: userWishlistCount,
      inWishlist: inUserWishlist,
      toggleWishlist: toggleUserWishlist,
      isPending: isTogglePending,
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
