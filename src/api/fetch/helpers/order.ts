import { OrderItem } from '@/types';
import { getData } from './get';

export const getOrder = async (id: string): Promise<OrderItem> => {
  return await getData<OrderItem>('shop_orders', {
    select:
      '*,items:shop_orderedproducts(quantity,product(id,slug,price,title,images,category,discount))',
    id: `eq.${id}`,
  });
};
