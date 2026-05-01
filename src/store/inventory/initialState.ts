import { initialStatus } from '@/constants/status';
import { InventoryStateProps } from '@/types';

export const initialInvetoryState: InventoryStateProps = {
  local: {
    cart: {
      items: [],
      count: 0,
      total: 0,
    },
    wishlist: {
      items: [],
      count: 0,
    },
  },
  user: {
    isAuth: false,
    info: null,
    inventory: {
      cart: {
        items: null,
        count: 0,
        total: 0,
      },
      wishlist: {
        items: null,
        count: 0,
      },
    },
  },
  status: {
    user: { ...initialStatus },
    cart: { ...initialStatus },
  },
};
