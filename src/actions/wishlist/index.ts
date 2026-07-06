'use server';
import { deleteData, postData } from '@/api/fetch/helpers/mutate';
import { initialActionState } from '@/constants/actionstatus';
import { ActionState, ToggleWishlistActionParams } from '@/types';

export const toggleWishlistAction = async (
  params: ToggleWishlistActionParams
) => {
  const actionState: ActionState = { ...initialActionState };

  const { intent, product, user_id } = params;

  try {
    if (intent === 'remove') {
      await deleteData('shop_wishlist', undefined, {
        product: `eq.${product}`,
      });
      actionState.message = 'Product removed from wishlist successfully!';
    }

    if (intent === 'add') {
      await postData('shop_wishlist', { user_id, product });
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
