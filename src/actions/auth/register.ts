'use server';
import { ActionState } from '@/types';
import { RegisterInput, registerSchema } from '../../schemas/register.schema';
import { signUp } from '@/api/fetch/helpers/auth/index';
import { initialActionState } from '@/constants/actionstatus';

export const registerAction = async (
  data: RegisterInput
): Promise<ActionState> => {
  const actionState: ActionState = initialActionState;

  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    actionState.status = 'failure';
    actionState.message = 'Validation Failed';
    return actionState;
  }

  const {
    email,
    password,
    confirmPassword,
    data: { user_name },
  } = parsed.data;

  try {
    await signUp({
      email,
      password,
      confirmPassword,
      data: {
        user_name,
      },
    });
    actionState.status = 'success';
    actionState.message = 'You have signed up successfully!';
    return actionState;
  } catch (error: unknown) {
    const err = error as Error;
    actionState.status = 'failure';
    actionState.message = err.message || 'Signing up failed! Please try again!';
    return actionState;
  }
};
