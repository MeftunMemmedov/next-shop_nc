'use server';

import { AuthActionState } from '@/types/actions';
import { RegisterInput, registerSchema } from '../../schemas/register.schema';
import { signUp } from '@/api/fetch/helpers/auth';

export const registerAction = async (
  _prevState: AuthActionState,
  data: RegisterInput
) => {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) return { error: 'Invalid data provided' };

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

    return { success: true };
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Signup Error:', err);
    return { error: err instanceof Error ? err.message : 'Login failed' };
  }
};

// -- Bu fonksiyon her yeni auth kaydında çalışır
// create function public.handle_new_user()
// returns trigger as $$
// begin
//   insert into public.shop_profiles (userId, email, userName, role)
//   values (new.id, new.email, new.raw_user_meta_data->>'userName', 'user'); -- Varsayılan role 'user'
//   return new;
// end;
// $$ language plpgsql security definer;

// -- Tetikleyiciyi oluştur
// create trigger on_auth_user_created
//   after insert on auth.users
//   for each row execute procedure public.handle_new_user();
