import { Meta_IMG } from '@/assets/images';
import { domain, metaDescription } from '@/constants/metadata';
import { Metadata } from 'next';

type CreateMetadataParams = {
  locale: string;
  title: string;
  description?: string;
  path: `/${string}`;
  image?: string;
};

export const createMetadata = ({
  locale,
  title,
  description = metaDescription,
  path,
  image = Meta_IMG.src,
}: CreateMetadataParams): Metadata => {
  const url = `${domain}/${locale}${path}`;

  return {
    title,
    description,

    metadataBase: new URL(domain),

    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, az: `/az${path}` },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: 'Music Shop by MFTN',
      type: 'website',
      images: [
        {
          url: image || '',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'az' ? 'az_AZ' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || ''],
      creator: '@mftndev',
    },

    robots: {
      index: true,
      follow: true,
    },
  };
};
