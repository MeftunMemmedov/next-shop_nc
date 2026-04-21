import { cookies } from 'next/headers';
import { LoginInput } from '@/schemas/login.schema';
import { RegisterInput } from '@/schemas/register.schema';
import { authFetch, fetchData } from '.';
import { User } from '@/types';

type SignInResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

export const getUser = async (access_token: string) => {
  try {
    const authUser = await authFetch<{ id: string }>('user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        revalidate: 3600,
        tags: ['authuser'],
      },
    });

    const user = await fetchData<User>(
      'shop_profiles',
      {
        select: '*',
        user_id: `eq.${authUser.id}`,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/vnd.pgrst.object+json',
        },
        next: {
          tags: ['user'],
        },
      }
    );
    return user;
  } catch {
    return null;
  }
};

export const getSession = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access')?.value;

  if (!access_token) return null;
  return await getUser(access_token);
};

export const signIn = async (data: LoginInput) => {
  return await authFetch<SignInResponse>('token?grant_type=password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const signUp = async (
  data: RegisterInput & { data: { user_name: string } }
): Promise<{
  access_token: string;
  user: {
    id: string;
    email: string;
    user_metadata: {
      user_name: string;
    };
  };
}> => {
  return await authFetch('signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const logOut = async () => {
  const cookieStore = await cookies();
  try {
    cookieStore.delete('access');
    cookieStore.delete('refresh');
  } catch {
    throw 'An error occured while logging out';
  }
};
