'use server';
import { postData } from '@/api/fetch/helpers/mutate';
import { initialActionState } from '@/constants/actionstatus';
import { ActionState } from '@/types';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const addCommentAction = async (
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> => {
  const user_id = formData.get('user_id');
  const product = formData.get('product');
  const comment = formData.get('comment');

  const actionState: ActionState = { ...initialActionState };

  if (comment?.toString().trim() === '') {
    actionState.status = 'failure';
    actionState.message = 'Comment field is required!';
    return actionState;
  }

  const access_token = (await cookies()).get('access')?.value;
  try {
    await postData(
      'shop_comments',
      { user_id, product, comment },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    revalidateTag(`comments-${product}`, '');
    actionState.status = 'success';
    actionState.message = 'Comment added successfully!';
    return actionState;
  } catch {
    actionState.status = 'failure';
    actionState.message =
      'An error occured while adding comment! Please try again!';
    return actionState;
  }
};
