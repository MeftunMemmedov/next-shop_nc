import { ReactNode } from 'react';
import Header from './Header';
import MobileHeader from './MobileHeader';
import Footer from './Footer';
import { UserAuthState } from '@/types';

const Layout = async ({
  children,
  userSession,
}: {
  children: ReactNode;
  userSession: UserAuthState | null;
}) => {
  return (
    <>
      <Header user={userSession} />
      <MobileHeader />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
