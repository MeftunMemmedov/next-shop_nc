'use server';

import { postData } from '@/api/fetch/helpers/mutate';
import { initialActionState } from '@/constants/actionstatus';
import { CheckoutInput } from '@/schemas/checkout.schema';
import { ActionState } from '@/types';
import { cookies } from 'next/headers';

export const checkoutProductsAction = async (
  data: CheckoutInput,
  orderItems: { product: string; quantity: number }[]
): Promise<ActionState> => {
  const { id, user_id, address, phone, note, user_name, email } = data;
  const access = (await cookies()).get('access')?.value;

  const actionState: ActionState & { orderItems: ActionState } = {
    ...initialActionState,
    orderItems: { ...initialActionState },
  };
  if (orderItems.length === 0) {
    actionState.status = 'failure';
    actionState.message = 'ERROR';
    return actionState;
  }
  try {
    await postData(
      'shop_orders',
      {
        id,
        user_id,
        user_name,
        email,
        address,
        phone,
        note,
        status: 'pending',
      },
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const ordersPromises = orderItems.map((orderItem) => {
      const { product, quantity } = orderItem;
      return postData(
        'shop_orderedproducts',
        {
          user_id,
          order: id,
          product,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
    });

    await Promise.all(ordersPromises);

    actionState.status = 'success';
    actionState.message = 'Order has been confirmed, successfully';
    return actionState;
  } catch (error) {
    const err = error as Error;
    actionState.status = 'failure';
    actionState.message = err.message || 'An error occured while confirm order';
    return actionState;
  }
};
