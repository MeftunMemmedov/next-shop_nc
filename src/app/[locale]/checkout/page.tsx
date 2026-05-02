import Checkout from '@/(pages)/Checkout';
import { getUser } from '@/api/fetch/helpers/auth';
import { getUserCart } from '@/api/fetch/helpers/cart';

const CheckoutPage = async () => {
  const userSession = await getUser();
  const userCart = userSession && (await getUserCart());
  return <Checkout cart={userCart} />;
};

export default CheckoutPage;
