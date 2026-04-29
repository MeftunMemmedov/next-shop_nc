import { CartItem } from '@/types';
import { getDatalist } from './get';
import { cookies } from 'next/headers';
import { postData } from './mutate';

export const getUserCart = async (): Promise<CartItem[] | null> => {
  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;
  if (!access) return null;
  const res = await getDatalist<CartItem>(
    'shop_cart',
    {
      select: '*,product(*)',
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      next: {
        tags: ['cart'],
      },
    }
  );
  return res;
};

export const syncUserCart = async (
  localItems: CartItem[],
  user_id: string,
  access_token: string
) => {
  const userCart = await getUserCart();
  if (userCart) {
    const userCartIds = new Set(userCart.map((item) => item.product.id));
    const cartSyncPromises = localItems
      .filter((localItem) => !userCartIds.has(localItem.product.id))
      .map((localItem) => {
        const {
          product: { id: product_id },
          quantity,
        } = localItem;

        return postData(
          'shop_cart',
          {
            product: product_id,
            user_id,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
      });

    await Promise.allSettled(cartSyncPromises);
  }
};
