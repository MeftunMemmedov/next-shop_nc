import Checkout from '@/(pages)/Checkout';
import { getUser } from '@/api/fetch/helpers/auth';
import { getUserCart } from '@/api/fetch/helpers/cart';
import { getPageTitle } from '@/helpers';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: getPageTitle('Checkout'),
};

const CheckoutPage = async () => {
  const userSession = await getUser();
  const userCart = userSession && (await getUserCart());
  if (!userSession || userCart?.length === 0) {
    notFound();
  }
  return <Checkout cart={userCart} user={userSession.user} />;
};

export default CheckoutPage;
