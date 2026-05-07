'use client';
import Spinner from '@/components/Spinner';
import { Product } from '@/types';
import dynamic from 'next/dynamic';

const CartFormComponent = dynamic(() => import('./component/index'), {
  ssr: false,
  loading: () => <Spinner />,
});
const CartForm = ({ product }: { product: Product }) => {
  return <CartFormComponent product={product} />;
};

export default CartForm;
