import { baseAuthURL } from '@/api';
import { fetchInstance } from '../..';
import { LoginInput } from '@/schemas/login.schema';
import { AuthTokens, SignInResponse, User, UserAuthState } from '@/types';
import { RegisterInput } from '@/schemas/register.schema';
import { getData } from '../get';
import { cookies } from 'next/headers';
import { EditUserInput } from '@/schemas/edituser.schema';
import { patchData } from '../mutate';

export const authAction = async (action: string, options: RequestInit = {}) => {
  const url = `${baseAuthURL}${action}`;
  const res = await fetchInstance(url, {
    ...options,
  });

  return res;
};

export const refreshAccess = async (
  refresh_token: string
): Promise<AuthTokens> => {
  const refreshRes = await authAction('token?grant_type=refresh_token', {
    method: 'POST',
    body: JSON.stringify({ refresh_token }),
  });

  return refreshRes.json();
};

export const signIn = async (data: LoginInput): Promise<SignInResponse> => {
  const res = await authAction('token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.msg || 'An error occured whilte get data');
  }

  return json;
};

export const signUp = async (data: RegisterInput): Promise<void> => {
  const res = await authAction('signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.msg || 'An error occured whilte get data');
  }
};

export const getUser = async (): Promise<UserAuthState | null> => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access')?.value;

  if (!access_token) return null;
  const authRes = await authAction('user', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const userJson = await authRes.json();

  if (!authRes.ok) {
    throw new Error(
      userJson.msg || 'An error occured whilte get user auth data'
    );
  }

  const user = await getData<User>(
    'shop_profiles',
    { select: '*', user_id: `eq.${userJson.id}` },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return {
    isAuth: !!authRes,
    user,
  };
};

export const editUser = async (data: EditUserInput) => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access')?.value;

  if (!access_token) return null;
  try {
    const authFetch = authAction('user', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        email: data.email,
        data: {
          user_name: data.data.user_name,
        },
      }),
    });

    const tableFetch = patchData(
      'shop_profiles',
      {
        user_name: data.data.user_name,
        email: data.email,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
      {
        user_id: `eq.${data.user_id}`,
      }
    );
    await Promise.all([authFetch, tableFetch]);
  } catch (error) {
    console.log(error);
  }
};
