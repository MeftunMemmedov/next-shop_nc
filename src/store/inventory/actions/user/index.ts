import { InventoryState, UserAuthState } from '@/types';

export const initUser = (
  state: InventoryState,
  { payload }: { payload: UserAuthState }
) => {
  state.user.info = payload.user;
  state.user.isAuth = payload.isAuth;
};

export const clearUser = (state: InventoryState) => {
  state.user.info = null;
  state.user.isAuth = false;
};

export const updateUser = (
  state: InventoryState,
  { payload }: { payload: { email: string; user_name: string } }
) => {
  state.user.info =
    state.user.info !== null
      ? {
          ...state.user.info,
          user_name: payload.user_name,
          email: payload.email,
        }
      : null;
};
