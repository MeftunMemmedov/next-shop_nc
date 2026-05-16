export type ActionState = {
  status: 'success' | 'failure' | 'idle';
  message: string;
};

export type SigninActionState = {
  signin: ActionState;
  cartSync: ActionState;
  wishlistSync: ActionState;
};

export type ToggleIntent = 'add' | 'remove';
