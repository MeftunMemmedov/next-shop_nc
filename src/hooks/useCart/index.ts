import { Dispatch, SetStateAction, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import { CartHookType, CartItem, Product } from '@/types';

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

  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const inUserCart = (product: Product): boolean | undefined => {
    return (
      userCartItems?.some((item) => item.product.id === product.id) ?? false
    );
  };

  const setLoadingProduct = (id: string, value: boolean) => {
    setLoadingIds((prev) => {
      const next = new Set(prev);
      if (value) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  };

  const toggleUserCart = async (product: Product, quantity: number = 1) => {
    const currentlyInCart = !!inUserCart(product);

    setLoadingProduct(product.id, true);

    if (currentlyInCart) {
      dispatch(removeFromUserCart(product));
    } else {
      dispatch(addToUserCart({ product: product, quantity: quantity }));
    }

    try {
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
          dispatch(changeUserCartItemQuantity({ product, quantity: 1 }));
          toast.error(`${product.title} | ${message}`);
        }
      }
    } catch {
      if (currentlyInCart) {
        toast.error('Something went wrong');
      }
    } finally {
      setLoadingProduct(product.id, false);
    }
  };

  const debouncedUpdateMapRef = useRef(
    new Map<string, (quantity: number) => void>()
  );

  const getDebouncedUpdater = (productId: string) => {
    if (!debouncedUpdateMapRef.current.has(productId)) {
      const debonceFn = debounce(async (quantity: number) => {
        setLoadingProduct(productId, true);
        try {
          const formData = new FormData();
          formData.append('quantity', quantity.toString());
          formData.append('product', productId);

          await updateCartitemQuantity(formData);
        } finally {
          setLoadingProduct(productId, false);
        }
      }, 500);

      debouncedUpdateMapRef.current.set(productId, debonceFn);
    }

    return debouncedUpdateMapRef.current.get(productId)!;
  };

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

    getDebouncedUpdater(item.product.id)(newQuantity);

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

    setLoadingProduct(product.id, true);
    try {
      const formData = new FormData();
      formData.append('quantity', quantity.toString());
      formData.append('product', product.id);
      const res = await updateCartitemQuantity(formData);
      const { status, message } = res;
      if (status === 'success') toast.success(`${product.title} | ${message}`);
      if (status === 'failure') toast.error(`${product.title} | ${message}`);

      if (onFailure && status === 'failure') onFailure();
    } finally {
      setLoadingProduct(product.id, false);
    }
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
      loadingIds: loadingIds,
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
    loadingIds: null,
  };
};

export default useCart;
