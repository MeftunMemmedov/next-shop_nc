import { Product } from '../product';

export type WishlistItem = {
  id?: string;
  product: Product;
  user_id?: string;
};

export type WishlistPayload = {
  payload: wishlistItem;
};
