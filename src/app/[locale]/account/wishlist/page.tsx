import Wishlist from '@/(pages)/Account/Wishlist';
import { getPageTitle } from '@/helpers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Wishlist'),
};

const WishlistPage = () => {
  return <Wishlist />;
};

export default WishlistPage;
