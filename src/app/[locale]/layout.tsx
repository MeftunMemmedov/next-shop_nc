import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import ReduxProvider from '@/store/provider';
import { ToastContainer } from 'react-toastify';
import { GlobalContextProvider } from '@/context/GlobalContext';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { setRequestLocale } from 'next-intl/server';
import { getUser } from '@/api/fetch/helpers/auth/index';
import { getUserCart } from '@/api/fetch/helpers/cart';
import { getUserWishlist } from '@/api/fetch/helpers/wishlist';
import { PROJECT_NAME } from '@/constants';
import './globals.css';
import Layout from '@/components/Layout';

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

  const userSession = await getUser();
  const userCartPromise = getUserCart();
  const userWishlistPromise = getUserWishlist();

  const [userCart, userWishlist] = userSession
    ? await Promise.all([userCartPromise, userWishlistPromise])
    : [null, null];

  setRequestLocale(locale);

  // if (!isValidLocale) {
  //   notFound();
  // }
  return (
    <html lang={finalLocale}>
      <head>
        <link rel="stylesheet" href="/assets/css/template.css" />
      </head>
      <body>
        <ReduxProvider
          user={userSession}
          cart={userCart}
          wishlist={userWishlist}>
          <NextIntlClientProvider locale={finalLocale} messages={null}>
            <ToastContainer />
            <Layout userSession={userSession}>
              <GlobalContextProvider>
                <NuqsAdapter>{children}</NuqsAdapter>
              </GlobalContextProvider>
            </Layout>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
