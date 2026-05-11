import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: String(process.env.NEXT_PUBLIC_API_URL).slice(8),
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
