'use client';
import Spinner from '@/components/Spinner';
import { Product } from '@/types';
import dynamic from 'next/dynamic';

const CartToggle = dynamic(() => import('./component'), {
  ssr: false,
  loading: () => <Spinner />,
});

const CartBtn = ({ product }: { product: Product }) => {
  return <CartToggle product={product} />;
};

export default CartBtn;
