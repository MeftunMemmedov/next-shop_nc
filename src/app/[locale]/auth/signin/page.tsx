import Auth from '@/(pages)/Auth';
import { getPageTitle } from '@/helpers';
import { createMetadata } from '@/helpers/metadata';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  return createMetadata({
    title: getPageTitle('Sign In'),
    locale,
    path: '/signin',
  });
};

const SignInPage = () => {
  return <Auth type="signin" />;
};

export default SignInPage;
