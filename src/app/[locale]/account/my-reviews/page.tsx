import MyReviews from '@/(pages)/Account/MyReviews';
import { getPageTitle } from '@/helpers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('My Reviews'),
};

const MyReviewsPage = () => {
  return <MyReviews />;
};

export default MyReviewsPage;
