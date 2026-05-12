import Home from '@/(pages)/Home';
import { getPageTitle } from '@/helpers';
import { createMetadata } from '@/helpers/metadata';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return createMetadata({
    title: getPageTitle('Home'),
    locale,
    path: '/',
  });
};

const HomePage = () => {
  return <Home />;
};

export default HomePage;
