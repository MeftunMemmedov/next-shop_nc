'use server';

import { logOut } from '@/api/fetch/helpers/auth';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const logoutAction = async () => {
  try {
    await logOut();
    revalidateTag('user', {});
    redirect('/');
  } catch (error) {
    throw error;
  }
};
