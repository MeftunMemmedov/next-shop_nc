'use server';

import { signIn } from '@/api/fetch/helpers/auth';
import { LoginInput, loginSchema } from '../../schemas/login.schema';
import { cookies } from 'next/headers';
import { AuthActionState } from '@/types/actions';

export const loginAction = async (
  _prevState: AuthActionState,
  data: LoginInput
) => {
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      error: 'Validation failed',
    };
  }
  const { email, password } = parsed.data;
  try {
    const res = await signIn({
      email,
      password,
    });

    const { access_token, refresh_token, expires_in } = res;
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
    });

    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      error: err instanceof Error ? err.message : 'Login failed',
    };
  }
};
