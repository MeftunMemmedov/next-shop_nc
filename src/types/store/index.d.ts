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
  status: {
    cart: Status;
    cartAction: Status;
    wishlist: Status;
    wishlistAction: Status;
  };
  errors: Record<string, string | null>;
};
