'use server';

import { editUser } from '@/api/fetch/helpers/auth';
import { initialActionState } from '@/constants/actionstatus';
import { EditUserInput, editUserSchema } from '@/schemas/edituser.schema';
import { ActionState } from '@/types';

export const editUserAction = async (
  data: EditUserInput,
  currentUserInfo: { email: string; user_name: string }
): Promise<ActionState> => {
  const parsed = editUserSchema.safeParse(data);

  const actionState: ActionState = { ...initialActionState };

  if (!parsed.success) {
    actionState.status = 'failure';
    actionState.message = 'Validation Failed';
    return actionState;
  }

  if (
    currentUserInfo.user_name === data.data.user_name &&
    currentUserInfo.email === data.email
  ) {
    actionState.status = 'failure';
    actionState.message = 'Your new data cannot be the same as previous!';
    return actionState;
  }

  try {
    await editUser(parsed.data);
    actionState.status = 'success';
    actionState.message = 'User information updated successfully!';
    return actionState;
  } catch (error) {
    const err = error as Error;
    actionState.status = 'failure';
    actionState.message =
      err.message ||
      'An error occured while updating user information! Please try again!';

    return actionState;
  }
};
