'use client';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const AccountLayout = dynamic(
  () => import('@/(pages)/Account/components/AccountLayout'),
  {
    ssr: false,
    loading: () => (
      <div className="py-5">
        <Spinner />
      </div>
    ),
  }
);

const AccountRootLayout = ({ children }: LayoutProps) => {
  return <AccountLayout>{children}</AccountLayout>;
};

export default AccountRootLayout;
