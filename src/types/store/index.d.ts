import { User } from '../user';

export type InventoryStateProps = {
  local: {
    cart: {
      items: CartItem[];
      count: number;
      total: number;
    };
    wishlist: {
      items: Product[];
      count: number;
    };
  };
  user: {
    info: User | null;
    inventory: {
      cart: {
        items: CartItem[] | null;
        count: number;
        total: number;
      };
      wishlist: {
        items: Product[] | null;
        count: number;
      };
    };
  };
};
