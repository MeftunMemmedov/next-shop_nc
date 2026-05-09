'use client';
import CheckoutSteps from '@/components/CheckoutSteps';
import dynamic from 'next/dynamic';

const CartList = dynamic(() => import('./components/CartList'), { ssr: false });
const Cart = () => {
  return (
    <main>
      <div className="mb-4 pb-5" role="presentation" />

      <section className="shop-checkout container mb-5">
        <h1 className="page-title text-sm-start text-center">Cart</h1>

        <CheckoutSteps currentStep={1} />
        <CartList />
      </section>
    </main>
  );
};

export default Cart;
