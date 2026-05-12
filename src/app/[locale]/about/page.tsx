import About from '@/(pages)/About';
import { getPageTitle } from '@/helpers';
import { createMetadata } from '@/helpers/metadata';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return createMetadata({
    title: getPageTitle('About'),
    locale,
    path: '/about',
  });
};

const AboutPage = () => {
  return <About />;
};

export default AboutPage;
