import { OrderItem } from '@/types';
import { cookies } from 'next/headers';
import { getData } from './get';

export const getOrderDetails = async (id: string): Promise<OrderItem> => {
  const access = (await cookies()).get('access')?.value;
  return await getData<OrderItem>(
    'shop_orders',
    {
      select:
        '*,items:shop_orderedproducts(quantity,product(id,slug,price,title,images,category,discount))',
      id: `eq.${id}`,
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );
};
