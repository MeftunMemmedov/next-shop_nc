import Orders from '@/(pages)/Account/Orders';
import { getDatalist } from '@/api/fetch/helpers/get';
import { getPageTitle } from '@/helpers';
import { OrderItem } from '@/types';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Orders'),
};

const OrdersPage = async () => {
  const userOrders = await getDatalist<OrderItem>('shop_orders', {
    select: '*,items:shop_orderedproducts(quantity,product(id,price,discount))',
  });

  return <Orders orders={userOrders} />;
};

export default OrdersPage;
