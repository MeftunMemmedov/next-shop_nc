import OrderComplete from '@/(pages)/OrderComplete';
import { getOrder } from '@/api/fetch/helpers/order';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Order complete!',
};

const OrderCompletePage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ id: string }>;
  params: Promise<{ locale: string }>;
}) => {
  const { id } = await searchParams;
  const { locale } = await params;

  if (!id) notFound();

  const orderDetails = await getOrder(id);
  return <OrderComplete orderDetails={orderDetails} locale={locale} />;
};

export default OrderCompletePage;
