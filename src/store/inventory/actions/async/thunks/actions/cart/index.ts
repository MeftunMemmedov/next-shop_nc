// import { FAILURE, LOADING, SUCCESS } from '@/constants/status';
// import { getProductPrice } from '@/helpers';
// import { CartItem, InventoryState, User } from '@/types';

// type AysncthunkAction<PayloadType> = {
//   pending: (state: InventoryState) => void;
//   fulfilled: (
//     state: InventoryState,
//     { payload }: { payload: PayloadType }
//   ) => void;
//   rejected: (state: InventoryState) => void;
// };

// export const getUserInfoActions: AysncthunkAction<{
//   user: User;
//   isAuth: boolean;
// }> = {
//   pending: (state: InventoryState) => {
//     state.status.user = { ...LOADING };
//   },
//   fulfilled: (
//     state: InventoryState,
//     { payload }: { payload: UserAuthState}
//   ) => {
//     state.status.user = { ...SUCCESS };
//     state.user.info = payload.user;
//     state.user.isAuth = payload.isAuth;
//   },
//   rejected: (state: InventoryState) => {
//     state.status.user = { ...FAILURE };
//   },
// };

// export const getCartActions: AysncthunkAction<CartItem[]> = {
//   pending: (state) => {
//     state.status.cart = { ...LOADING };
//   },
//   fulfilled: (state, { payload }: { payload: CartItem[] }) => {
//     state.status.cart = { ...SUCCESS };
//     state.user.inventory.cart.items = payload;
//     state.user.inventory.cart.count = payload.length;
//     state.user.inventory.cart.total = payload.reduce((acc, item) => {
//       return acc + getProductPrice(item.product) * item.quantity;
//     }, 0);
//   },
//   rejected: (state) => {
//     state.status.cart = { ...FAILURE };
//   },
// };
