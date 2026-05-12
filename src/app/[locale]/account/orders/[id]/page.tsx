import OrderDetails from '@/(pages)/Account/OrderDetails';
import { getOrder } from '@/api/fetch/helpers/order';
import { cache } from 'react';

const getOrderDetails = cache(async (id: string) => {
  return await getOrder(id);
});

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await getOrderDetails(id);
  return {
    title: `Order #${order.id}`,
  };
};

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await getOrderDetails(id);
  return <OrderDetails order={order} />;
};

export default OrderDetailsPage;
