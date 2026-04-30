import { Dispatch, SetStateAction, useRef, useTransition } from 'react';

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
import { toggleCartAction, updateCartitemQuantity } from '@/actions/cart';
import { debounce } from '@/helpers/debounce';
import { useRouter } from '@/i18n/routing';

type CartHookType = {
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

const useCart = (): CartHookType => {
  const dispatch = useAppDispatch();
  const { local, user } = useAppSelector((store) => store.inventory);

  // --------------------------------LOCAL ---------------------------------------------//
  const {
    items: localCartItems,
    count: localCartCount,
    total: localCartTotal,
  } = local.cart;

  const router = useRouter();

  const inLocalCart = (product: Product): boolean => {
    return localCartItems.some((item) => item.product.id === product.id);
  };

  const toggleLocalCart = (product: Product, quantity: number = 1) => {
    if (inLocalCart(product)) {
      dispatch(removeFromLocalCart(product));
      toast.error(`${product.title} removed from cart`);
    } else {
      if (localCartItems.length >= 2) {
        router.push('/auth/signin');
        return;
      }
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

  const { isAuth, info: userInfo } = user;

  const [isCartActionPending, startCartActionTransition] = useTransition();

  const inUserCart = (product: Product): boolean | undefined => {
    return (
      userCartItems?.some((item) => item.product.id === product.id) ?? false
    );
  };

  const toggleUserCart = (product: Product, quantity: number = 1) => {
    if (inUserCart(product)) {
      dispatch(removeFromUserCart(product));
    } else {
      dispatch(addToUserCart({ product: product, quantity: quantity }));
    }

    startCartActionTransition(async () => {
      if (isAuth && userInfo) {
        const formData = new FormData();
        formData.append('product', product.id);
        formData.append('quantity', quantity.toString());
        formData.append('slug', product.slug);
        formData.append('user_id', userInfo.user_id);
        formData.append('intent', inUserCart(product) ? 'remove' : 'add');

        const res = await toggleCartAction(formData);
        const { status, message } = res;
        if (status === 'success')
          toast.success(`${product.title} | ${message}`);
        if (status === 'failure') {
          toast.error(`${product.title} | ${message}`);
          if (inUserCart(product)) {
            dispatch(changeUserCartItemQuantity({ product, quantity: 1 }));
          }
        }
      }
    });
  };

  const debouncedUpdateRef = useRef(
    debounce(async (productId: string, quantity: number) => {
      startCartActionTransition(async () => {
        const formData = new FormData();
        formData.append('quantity', quantity.toString());
        formData.append('product', productId);

        await updateCartitemQuantity(formData);
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
    onFailure?: () => void
  ) => {
    dispatch(changeUserCartItemQuantity({ product, quantity }));

    startCartActionTransition(async () => {
      const formData = new FormData();
      formData.append('quantity', quantity.toString());
      formData.append('product', product.id);
      const res = await updateCartitemQuantity(formData);
      const { status, message } = res;
      if (status === 'success') toast.success(`${product.title} | ${message}`);
      if (status === 'failure') toast.error(`${product.title} | ${message}`);

      if (onFailure && status === 'failure') onFailure();
    });
  };

  if (isAuth) {
    return {
      items: userCartItems,
      count: userCartCount,
      total: userCartTotal,
      inCart: inUserCart,
      toggleCart: toggleUserCart,
      handleClickQuantity: handleClickUserQuantity,
      updateQuantity: updateQuantityAction,
      isPending: isCartActionPending,
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
