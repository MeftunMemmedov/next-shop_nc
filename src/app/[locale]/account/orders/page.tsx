import Orders from '@/(pages)/Account/Orders';
import { getDatalist } from '@/api/fetch/helpers/get';
import { OrderItem } from '@/types';
import { cookies } from 'next/headers';

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
