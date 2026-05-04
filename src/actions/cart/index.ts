'use server';
import { deleteData, patchData, postData } from '@/api/fetch/helpers/mutate';
import { initialActionState } from '@/constants/actionstatus';
import { ActionState } from '@/types';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const toggleCartAction = async (formData: FormData) => {
  const user_id = formData.get('user_id');
  const product = formData.get('product');
  const quantity = formData.get('quantity');
  const intent = formData.get('intent');
  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;

  const actionState: ActionState = { ...initialActionState };

  try {
    if (intent === 'remove') {
      await deleteData(
        'shop_cart',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
        { product: `eq.${product}` }
      );
      actionState.message = 'Product removed from cart successfully!';
    }

    if (intent === 'add') {
      await postData(
        'shop_cart',
        {
          user_id,
          product,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      actionState.message = 'Product added to cart successfully!';
    }

    actionState.status = 'success';
    return actionState;
  } catch {
    actionState.status = 'failure';
    actionState.message =
      'An error occured while toggling cart! Please try again';
    return actionState;
  }
};

export const updateCartitemQuantity = async (formData: FormData) => {
  const product = formData.get('product');
  const quantity = parseInt(formData.get('quantity') as string);

  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;

  const actionState: ActionState = { ...initialActionState };

  try {
    await patchData<{ quantity: number }>(
      'shop_cart',
      { quantity: quantity },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      },
      { product: `eq.${product}` }
    );

    actionState.status = 'success';
    actionState.message = 'Quantity updated successfully';
    return actionState;
  } catch {
    actionState.status = 'failure';
    actionState.message =
      'An error occured while updating quantity! Please try again!';
    return actionState;
  }
};

export const clearUserCartAction = async (cartItems: { product: string }[]) => {
  const cookieStore = await cookies();
  const access = cookieStore.get('access')?.value;

  const actionState: ActionState = { ...initialActionState };
  try {
    const deleteCartItemPromises = cartItems.map((cartItem) => {
      const { product } = cartItem;
      deleteData(
        'shop_cart',
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        },
        {
          product: `eq.${product}`,
        }
      );
    });

    await Promise.all(deleteCartItemPromises);
    revalidatePath('/', 'layout');
    actionState.status = 'success';
    return actionState;
  } catch {
    actionState.status = 'failure';
    return actionState;
  }
};

export const revalidateCartData = async () => {
  revalidateTag('cart', {});
};

export const action = async () => {
  console.log('I AM FUCKING ACTIONNN');
};
