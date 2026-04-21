import {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useTransition,
} from 'react';

import { toast } from 'react-toastify';

import { CartItem, Product } from '@/types';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToLocalCart,
  addToUserCart,
  changeLocalCartItemQuantity,
  changeUserCartItemQuantity,
  removeFromLocalCart,
  removeFromUserCart,
} from '@/store/inventory';
import { toggle_Cart, update_cartItemQuantity } from '@/actions/cart';
import { debounce } from '@/helpers/debounce';

const useCart = (): {
  items: CartItem[] | null;
  count: number;
  total: number;
  toggleCart: (product: Product, quantity: number) => void;
  inCart: (product: Product) => boolean | undefined;
  actionState?: {
    status: string;
    message: string;
  } | null;
  isPending?: boolean;
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
} => {
  const dispatch = useAppDispatch();
  const { local, user } = useAppSelector((store) => store.inventory);

  // --------------------------------LOCAL ---------------------------------------------//
  const {
    items: localCartItems,
    count: localCartCount,
    total: localCartTotal,
  } = local.cart;

  const inLocalCart = (product: Product): boolean => {
    return localCartItems.some((item) => item.product.id === product.id);
  };

  const toggleLocalCart = (product: Product, quantity: number = 1) => {
    if (inLocalCart(product)) {
      dispatch(removeFromLocalCart(product));
      toast.error(`${product.title} removed from cart`);
    } else {
      dispatch(addToLocalCart({ product: product, quantity: quantity }));
      toast.success(`${product.title} added to cart`);
    }
  };

  const handleClickLocalQuantity = (
    item: CartItem,
    type: '+' | '-',
    setQuantity?: Dispatch<SetStateAction<string>>
  ) => {
    const newQuantity = type === '+' ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) return;

    dispatch(
      changeLocalCartItemQuantity({
        product: item.product,
        quantity: newQuantity,
      })
    );

    if (setQuantity) {
      setQuantity(newQuantity.toString());
    }
  };

  const updateLocalCartItemQuantity = (product: Product, quantity: number) => {
    dispatch(changeLocalCartItemQuantity({ product, quantity }));
  };

  // --------------------------------USER ---------------------------------------------//
  const {
    items: userCartItems,
    count: userCartCount,
    total: userCartTotal,
  } = user.inventory.cart;
  const { info: userInfo } = user;

  const [actionState, setActionState] = useState<{
    status: string;
    message: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  const inUserCart = (product: Product): boolean | undefined => {
    return (
      userCartItems?.some((item) => item.product.id === product.id) ?? false
    );
  };

  const toggleUserCart = (product: Product, quantity: number = 1) => {
    if (inUserCart(product)) {
      dispatch(removeFromUserCart(product));
      toast.error(`${product.title} removed from USER cart`);
    } else {
      dispatch(addToUserCart({ product: product, quantity: quantity }));
      toast.success(`${product.title} added to USER cart`);
    }

    startTransition(async () => {
      if (userInfo !== null) {
        const formData = new FormData();
        formData.append('product', product.id);
        formData.append('quantity', quantity.toString());
        formData.append('user_id', userInfo.user_id);
        formData.append('intent', inUserCart(product) ? 'remove' : 'add');

        const result = await toggle_Cart(null, formData);

        setActionState((prevState) => ({
          ...prevState,
          status: result.status,
          message: result.message,
        }));
      }
    });
  };

  const debouncedUpdateRef = useRef(
    debounce(async (productId: string, quantity: number) => {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('quantity', quantity.toString());
        formData.append('product', productId);

        await update_cartItemQuantity(null, formData);
      });
    }, 500)
  );

  const handleClickUserQuantity = (
    item: CartItem,
    type: '+' | '-',
    setQuantity?: Dispatch<SetStateAction<string>>
  ) => {
    const newQuantity = type === '+' ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) return;

    dispatch(
      changeUserCartItemQuantity({
        product: item.product,
        quantity: newQuantity,
      })
    );

    debouncedUpdateRef.current(item.product.id, newQuantity);
    if (setQuantity) {
      setQuantity(newQuantity.toString());
    }
  };

  const updateQuantityAction = async (
    product: Product,
    quantity: number,
    func?: () => void
  ) => {
    dispatch(changeUserCartItemQuantity({ product, quantity }));

    startTransition(async () => {
      const formData = new FormData();
      formData.append('quantity', quantity.toString());
      formData.append('product', product.id);
      const res = await update_cartItemQuantity(null, formData);
      if (func && res.status === 'failure') func();
    });
  };

  if (userInfo !== null) {
    return {
      items: userCartItems,
      count: userCartCount,
      total: userCartTotal,
      inCart: inUserCart,
      toggleCart: toggleUserCart,
      handleClickQuantity: handleClickUserQuantity,
      updateQuantity: updateQuantityAction,
      actionState,
      isPending,
    };
  }
  return {
    items: localCartItems,
    count: localCartCount,
    total: localCartTotal,
    inCart: inLocalCart,
    toggleCart: toggleLocalCart,
    handleClickQuantity: handleClickLocalQuantity,
    updateQuantity: updateLocalCartItemQuantity,
  };
};

export default useCart;
