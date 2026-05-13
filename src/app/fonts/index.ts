import localFont from 'next/font/local';

export const quickSand = localFont({
  src: [
    {
      path: './quicksand/Quicksand-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './quicksand/Quicksand-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './quicksand/Quicksand-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './quicksand/Quicksand-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './quicksand/Quicksand-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});
