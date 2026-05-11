import { domain, metaDescription } from '@/constants/metadata';
import { getPageTitle } from '@/helpers';
import { Metadata } from 'next';

const title = getPageTitle('Home');
const description = metaDescription;

export const defaultMetadata: Metadata = {
  title,
  description,
  metadataBase: new URL(domain),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      az: '/az',
    },
  },
  openGraph: {
    title,
    description,
    url: domain,
    siteName: 'Music Shop by MFTN',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Music Shop by MFTN - Musical Instruments Store',
      },
    ],
    locale: '',
    type: 'website',
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
    creator: 'mftndev',
    images: [''],
  },
  robots: {
    index: false,
    follow: false,
  },
};
