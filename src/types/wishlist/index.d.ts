import { Product } from '../product';

export type WishlistItem = {
  id?: string;
  product: Product;
  user_id?: string;
};

export type WishlistHookType = {
  items: WishlistItem[] | null;
  count: number;
  inWishlist: (product: Product) => boolean | undefined;
  toggleWishlist: (product: Product) => void;
  loadingIds: Set<string>;
};
