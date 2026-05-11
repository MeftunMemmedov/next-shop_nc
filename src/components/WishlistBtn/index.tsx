'use client';
import dynamic from 'next/dynamic';
import Spinner from '../Spinner';
import { Product } from '@/types';

const WishlistToggle = dynamic(() => import('./component/'), {
  ssr: false,
  loading: () => <Spinner />,
});

const WishlistBtn = ({ product }: { product: Product }) => {
  return <WishlistToggle product={product} />;
};

export default WishlistBtn;
