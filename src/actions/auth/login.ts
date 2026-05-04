'use server';
import { LoginInput, loginSchema } from '../../schemas/login.schema';
import { cookies } from 'next/headers';
import { SigninActionState } from '@/types/actions';
import { signIn } from '@/api/fetch/helpers/auth/index';
import { revalidatePath } from 'next/cache';
import { CartItem, WishlistItem } from '@/types';
import { syncUserCart } from '@/api/fetch/helpers/cart';
import { initialActionState } from '@/constants/actionstatus';
import { syncUserWishlist } from '@/api/fetch/helpers/wishlist';

export const loginAction = async (
  localCart: {
    count: number;
    items: CartItem[];
  },
  localWishlist: {
    count: number;
    items: WishlistItem[];
  },
  data: LoginInput
): Promise<SigninActionState> => {
  const actionState: SigninActionState = {
    signin: { ...initialActionState },
    cartSync: { ...initialActionState },
    wishlistSync: { ...initialActionState },
  };

  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    actionState.signin.status = 'failure';
    actionState.signin.message = 'Validation failed!';
    return actionState;
  }

  const { email, password, remember_me } = parsed.data;
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
      maxAge: remember_me ? 60 * 60 * 24 * 7 : undefined,
      secure: true,
      sameSite: 'lax',
      httpOnly: true,
    });

    if (remember_me) {
      cookieStore.set('remember', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        sameSite: 'lax',
        httpOnly: true,
      });
    }

    actionState.signin = {
      status: 'success',
      message: 'You have successfully signed in',
    };

    const { count: cartCount, items: cartItems } = localCart;

    if (cartCount > 0) {
      try {
        await syncUserCart(cartItems, user_id, access_token);

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

    const { count: wishlistCount, items: wishlistItems } = localWishlist;

    if (wishlistCount > 0) {
      try {
        await syncUserWishlist(wishlistItems, user_id, access_token);

        actionState.wishlistSync = {
          status: 'success',
          message: 'User wishlist synchronization successfully completed!',
        };
      } catch {
        actionState.wishlistSync = {
          status: 'failure',
          message: 'User wishlist synchronization failed!',
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
