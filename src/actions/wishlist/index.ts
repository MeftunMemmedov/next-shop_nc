'use server';
import { deleteData, postData } from '@/api/fetch/helpers/mutate';
import { initialActionState } from '@/constants/actionstatus';
import { ActionState, ToggleWishlistActionParams } from '@/types';
import { cookies } from 'next/headers';

export const toggleWishlistAction = async (
  params: ToggleWishlistActionParams
) => {
  const access = (await cookies()).get('access')?.value;

  const actionState: ActionState = { ...initialActionState };

  const { intent, product, user_id } = params;

  try {
    if (intent === 'remove') {
      await deleteData(
        'shop_wishlist',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
        {
          product: `eq.${product}`,
        }
      );
      actionState.message = 'Product removed from wishlist successfully!';
    }

    if (intent === 'add') {
      await postData(
        'shop_wishlist',
        { user_id, product },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      actionState.message = 'Product added to wishlist successfully!';
    }
    actionState.status = 'success';
    return actionState;
  } catch {
    actionState.status = 'failure';
    actionState.message =
      'An error occured while toggling wishlist. Please try again!';
    return actionState;
  }
};
