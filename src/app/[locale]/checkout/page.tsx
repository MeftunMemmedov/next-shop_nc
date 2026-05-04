import Checkout from '@/(pages)/Checkout';
import { getUser } from '@/api/fetch/helpers/auth';
import { getUserCart } from '@/api/fetch/helpers/cart';
import { notFound } from 'next/navigation';

const CheckoutPage = async () => {
  const userSession = await getUser();
  const userCart = userSession && (await getUserCart());
  if (!userSession || userCart?.length === 0) {
    notFound();
  }
  return <Checkout cart={userCart} user={userSession.user} />;
};

export default CheckoutPage;
