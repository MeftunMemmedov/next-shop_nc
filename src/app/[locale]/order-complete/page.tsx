import OrderComplete from '@/(pages)/OrderComplete';
import { getOrderDetails } from '@/api/fetch/helpers/order';
import { notFound } from 'next/navigation';

const OrderCompletePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;

  if (!id) notFound();

  const orderDetails = await getOrderDetails(id);
  return <OrderComplete orderDetails={orderDetails} />;
};

export default OrderCompletePage;
