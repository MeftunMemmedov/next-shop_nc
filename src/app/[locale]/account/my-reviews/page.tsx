import MyReviews from '@/(pages)/Account/MyReviews';
import { getPageTitle } from '@/helpers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: getPageTitle('My Reviews'),
};

const MyReviewsPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return <MyReviews locale={locale} />;
};

export default MyReviewsPage;
