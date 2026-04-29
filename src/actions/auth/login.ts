'use server';
import { LoginInput, loginSchema } from '../../schemas/login.schema';
import { cookies } from 'next/headers';
import { SigninActionState } from '@/types/actions';
import { signIn } from '@/api/fetch/helpers/auth/index';
import { revalidatePath } from 'next/cache';
import { CartItem } from '@/types';
import { syncUserCart } from '@/api/fetch/helpers/cart';
import { initialActionState } from '@/constants/actionstatus';

export const loginAction = async (
  localCart: {
    count: number;
    items: CartItem[];
  },
  data: LoginInput
): Promise<SigninActionState> => {
  const actionState: SigninActionState = {
    signin: initialActionState,
    cartSync: initialActionState,
  };

  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    actionState.signin.status = 'failure';
    actionState.signin.message = 'Validation failed!';
    return actionState;
  }

  const { email, password } = parsed.data;
  try {
    const res = await signIn({
      email,
      password,
    });

    const {
      access_token,
      refresh_token,
      expires_in,
      user: { id: user_id },
    } = res;

    const cookieStore = await cookies();

    cookieStore.set('access', access_token, {
      path: '/',
      maxAge: expires_in,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    cookieStore.set('refresh', refresh_token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
    });

    actionState.signin = {
      status: 'success',
      message: 'You have successfully signed in',
    };

    const { count, items } = localCart;

    if (count > 0) {
      try {
        await syncUserCart(items, user_id, access_token);

        actionState.cartSync = {
          status: 'success',
          message: 'User cart synchronization successfully completed!',
        };
      } catch {
        actionState.cartSync = {
          status: 'failure',
          message: 'User cart synchronization failed!',
        };
      }
    }

    revalidatePath('/', 'layout');
    return actionState;
  } catch (error: unknown) {
    const err = error as Error;
    actionState.signin = {
      status: 'failure',
      message: err?.message || 'Sign in failed',
    };

    return actionState;
  }
};
