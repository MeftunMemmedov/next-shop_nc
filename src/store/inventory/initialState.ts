import { initialStatus } from '@/constants/status';
import { getProductPrice } from '@/helpers';
import { CartItem, InventoryStateProps, WishlistItem } from '@/types';

const localCartData =
  typeof window !== 'undefined' && localStorage.getItem('cart');
const localCart = localCartData
  ? (JSON.parse(localCartData) as CartItem[])
  : [];

const localWishlistData =
  typeof window !== 'undefined' && localStorage.getItem('wishlist');
const localWishlist = localWishlistData
  ? (JSON.parse(localWishlistData) as WishlistItem[])
  : [];

export const initialInvetoryState: InventoryStateProps = {
  local: {
    cart: {
      items: localCart,
      count: localCart.length,
      total: localCart.reduce((acc, item) => {
        return acc + getProductPrice(item?.product) * item.quantity;
      }, 0),
    },
    wishlist: {
      items: localWishlist,
      count: localWishlist.length,
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
