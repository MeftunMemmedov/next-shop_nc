import { Product } from '../product';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartHookType = {
  items: CartItem[] | null;
  count: number;
  total: number;
  isPending?: boolean;
  toggleCart: (product: Product, quantity: number) => void;
  inCart: (product: Product) => boolean | undefined;
  handleClickQuantity: (
    item: CartItem,
    type: '+' | '-',
    setQuantity?: Dispatch<SetStateAction<string>>
  ) => void;
  updateQuantity: (
    product: Product,
    quantity: number,
    func: () => void
  ) => void;
};
