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
import localFont from 'next/font/local';
import MobileHeader from '@/components/Layout/MobileHeader';
import { getData } from '@/api/fetch/helpers/get';
import { Config } from '@/types';
import { PROJECT_NAME } from '@/constants';

// import '@/assets/css/flaticon.css';
// import '@/assets/css/swiper.min.css';
// import '@/assets/css/template.css';
import './globals.css';

export const generateStaticParams = () => {
  return routing.locales.map((locale) => ({ locale }));
};

export const metadata: Metadata = {
  title: PROJECT_NAME,
};

const quickSand = localFont({
  src: [
    {
      path: '../../assets/fonts/quicksand/Quicksand-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/quicksand/Quicksand-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/quicksand/Quicksand-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/quicksand/Quicksand-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/quicksand/Quicksand-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

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
      <body className={quickSand.className}>
        <ReduxProvider
          user={userSession}
          cart={userCart}
          wishlist={userWishlist}>
          <NextIntlClientProvider>
            <ToastContainer
              toastClassName={`${quickSand.className} fw-semibold`}
            />
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
