import { Status } from '@/constants/status';
import { User } from '../user';
import { WritableDraft } from '@reduxjs/toolkit';

type InventoryStateProps = {
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
    isAuth: boolean;
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
  status: {
    user: Status;
    cart: Status;
  };
};

type CartPayload = { payload: CartItem };
type InventoryState = WritableDraft<InventoryStateProps>;
