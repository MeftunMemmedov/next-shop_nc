import AccountLayout from '@/(pages)/Account/components/AccountLayout';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const AccountRootLayout = ({ children }: LayoutProps) => {
  return <AccountLayout>{children}</AccountLayout>;
};

export default AccountRootLayout;
