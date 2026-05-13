import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import ReduxProvider from '@/store/provider';
import { ToastContainer } from 'react-toastify';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { GlobalContextProvider } from '@/context/GlobalContext';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { setRequestLocale } from 'next-intl/server';
import { getCategoryListwChildren } from '@/api/fetch/helpers/category';
import { getUser } from '@/api/fetch/helpers/auth/index';
import { getUserCart } from '@/api/fetch/helpers/cart';
import { getUserWishlist } from '@/api/fetch/helpers/wishlist';
import MobileHeader from '@/components/Layout/MobileHeader';
import { getData } from '@/api/fetch/helpers/get';
import { Config } from '@/types';
import { PROJECT_NAME } from '@/constants';
import './globals.css';

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export const metadata: Metadata = {
  title: PROJECT_NAME,
};

interface RootLayoutParams {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const RootLayout = async ({ children, params }: Readonly<RootLayoutParams>) => {
  const { locale } = await params;

  const isValidLocale = hasLocale(routing.locales, locale);

  const finalLocale = isValidLocale ? locale : routing.defaultLocale;

  const categories = await getCategoryListwChildren();

  const userSession = await getUser();
  const userCart = userSession && (await getUserCart());
  const userWishlist = userSession && (await getUserWishlist());
  setRequestLocale(locale);
  const config = await getData<Config>('shop_config', { select: '*' });

  // if (!isValidLocale) {
  //   notFound();
  // }
  return (
    <html lang={finalLocale}>
      <head>
        <link rel="stylesheet" href="/assets/css/template.css" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
      </head>
      <body>
        <ReduxProvider
          user={userSession}
          cart={userCart}
          wishlist={userWishlist}>
          <NextIntlClientProvider>
            <ToastContainer />
            <Header categories={categories} user={userSession} />
            <MobileHeader
              categories={categories}
              user={userSession}
              config={config}
            />
            <GlobalContextProvider>
              <NuqsAdapter>{children}</NuqsAdapter>
            </GlobalContextProvider>
            <Footer categories={categories} config={config} />
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
