export type AuthActionState = {
  status: 'success' | 'failure';
  message: string;
} | null;

export type ActionState = {
  status: 'success' | 'failure' | 'idle';
  message: string;
};

export type SigninActionState = {
  signin: ActionState;
  cartSync: ActionState;
  wishlistSync: ActionState;
};
