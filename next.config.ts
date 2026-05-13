import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  webpack(config) {
    return config;
  },
  reactCompiler: true,
  trailingSlash: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_API_URL!).hostname,
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
