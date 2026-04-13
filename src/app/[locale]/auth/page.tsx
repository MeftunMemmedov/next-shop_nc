import { redirect } from '@/i18n/routing';

interface Props {
  params: Promise<{ locale: string }>;
}

const Auth = async ({ params }: Props) => {
  const { locale } = await params;
  redirect({ href: '/auth/signin/', locale: locale });
};

export default Auth;
