import OrderDetails from '@/(pages)/Account/OrderDetails';
import { getOrderDetails } from '@/api/fetch/helpers/order';

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
