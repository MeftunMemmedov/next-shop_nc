import Contact from '@/(pages)/Contact';
import { getPageTitle } from '@/helpers';
import { createMetadata } from '@/helpers/metadata';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return createMetadata({
    title: getPageTitle('Contact'),
    locale,
    path: '/contact',
  });
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;
