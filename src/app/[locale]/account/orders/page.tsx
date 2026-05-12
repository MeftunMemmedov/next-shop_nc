import Orders from '@/(pages)/Account/Orders';
import { getDatalist } from '@/api/fetch/helpers/get';
import { getPageTitle } from '@/helpers';
import { OrderItem } from '@/types';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: getPageTitle('Orders'),
};

const OrdersPage = async () => {
  const access = (await cookies()).get('access')?.value;

  const userOrders = await getDatalist<OrderItem>(
    'shop_orders',
    {
      select:
        '*,items:shop_orderedproducts(quantity,product(id,price,discount))',
    },
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }
  );

  return <Orders orders={userOrders} />;
};

export default OrdersPage;
