'use server';
import { initialActionState } from '@/constants/actionstatus';
import { ActionState } from '@/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const logoutAction = async () => {
  const actionState: ActionState = { ...initialActionState };

  try {
    const cookieStore = await cookies();
    cookieStore.delete('access');
    cookieStore.delete('refresh');
    cookieStore.delete('remember');
    actionState.status = 'success';
    actionState.message = 'You have logged out successfully!';
    revalidatePath('/', 'layout');
    return actionState;
  } catch (error) {
    const err = error as Error;
    actionState.status = 'failure';
    actionState.message =
      err.message || 'An error occured while loggin out! Please try again!';
    return actionState;
  }
};
