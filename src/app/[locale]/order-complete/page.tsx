import OrderComplete from '@/(pages)/OrderComplete';
import { getOrder } from '@/api/fetch/helpers/order';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Order complete!',
};

const OrderCompletePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const { id } = await searchParams;

  if (!id) notFound();

  const orderDetails = await getOrder(id);
  return <OrderComplete orderDetails={orderDetails} />;
};

export default OrderCompletePage;
