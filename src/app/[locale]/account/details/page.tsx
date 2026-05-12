import AccountDetails from '@/(pages)/Account/AccountDetails';
import { getPageTitle } from '@/helpers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('Account'),
};

const AccountDetailsPage = () => {
  return <AccountDetails />;
};

export default AccountDetailsPage;
