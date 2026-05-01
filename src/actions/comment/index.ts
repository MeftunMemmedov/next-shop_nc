'use server';
import { deleteData, patchData, postData } from '@/api/fetch/helpers/mutate';
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

export const deleteCommentAction = async (
  formData: FormData
): Promise<ActionState> => {
  const access = (await cookies()).get('access')?.value;
  const user_id = formData.get('user_id');
  const comment = formData.get('id');

  const actionState: ActionState = { ...initialActionState };
  try {
    await deleteData(
      'shop_comments',
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
      {
        id: `eq.${comment}`,
        user_id: `eq.${user_id}`,
      }
    );
    actionState.status = 'success';
    actionState.message = 'Comment deleted successfully';
    revalidateTag('my-comments', '');
    return actionState;
  } catch (error) {
    const err = error as Error;
    actionState.status = 'failure';
    actionState.message =
      err.message || 'An error occured while deleting comment.';
    return actionState;
  }
};

export const editCommentAction = async (
  _prevState: ActionState | null,
  formData: FormData
): Promise<ActionState> => {
  const access = (await cookies()).get('access')?.value;
  const commentId = formData.get('id');
  const comment = formData.get('comment');

  const actionState: ActionState = { ...initialActionState };

  if (comment?.toString().trim() === '') {
    actionState.status = 'failure';
    actionState.message = 'Comment field is required!';
    return actionState;
  }
  try {
    await patchData(
      'shop_comments',
      { comment },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
      { id: `eq.${commentId}` }
    );
    actionState.status = 'success';
    actionState.message = 'Your comment has been updated, SUCCESFULLY!';
    revalidateTag('my-comments', '');
    return actionState;
  } catch (error) {
    const err = error as Error;
    actionState.status = 'failure';
    actionState.message =
      err.message || 'Your comment has been updated, SUCCESFULLY!';
    return actionState;
  }
};
