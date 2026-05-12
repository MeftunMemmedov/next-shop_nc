import Cart from '@/(pages)/Cart';
import { getPageTitle } from '@/helpers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Cart'),
};
const CartPage = () => {
  return <Cart />;
};

export default CartPage;
