import { WishlistItem } from '@/types';
import { cookies } from 'next/headers';
import { getDatalist } from './get';
import { postData } from './mutate';

export const getUserWishlist = async (): Promise<WishlistItem[] | null> => {
  const access = (await cookies()).get('access')?.value;
  if (!access) return null;
  const res = await getDatalist<WishlistItem>(
    'shop_wishlist',
    {
      select: 'product(*)',
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      next: {
        tags: ['wishlist'],
      },
    }
  );
  return res;
};

export const syncUserWishlist = async (
  localItems: WishlistItem[],
  user_id: string,
  access_token: string
) => {
  const userWishlist = await getUserWishlist();
  if (userWishlist) {
    const userWishlistIds = new Set(
      userWishlist.map((item) => item.product.id)
    );

    const wishlistSyncPromises = localItems
      .filter((localItem) => !userWishlistIds.has(localItem.product.id))
      .map((localItem) => {
        const {
          product: { id: product_id },
        } = localItem;

        return postData(
          'shop_wishlist',
          {
            product: product_id,
            user_id,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      });

    await Promise.allSettled(wishlistSyncPromises);
  }
};
