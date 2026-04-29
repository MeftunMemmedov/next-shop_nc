export type User = {
  id: string;
  email: string;
  user_name: string;
  user_id: string;
};

export type UserAuthState = { user: User; isAuth: boolean };
