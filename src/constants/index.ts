export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME;
export const routes: {
  title: string;
  path: string;
}[] = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Products',
    path: '/products',
  },
  {
    title: 'About',
    path: '/about',
  },
  {
    title: 'Contact',
    path: '/contact',
  },
  {
    title: 'Our Stores',
    path: '/stores',
  },
];

export const languages = [
  {
    code: 'az',
    name: 'Azərbaycan',
  },
  {
    code: 'en',
    name: 'English',
  },
];

export const accountRoutes = [
  {
    title: 'Account Details',
    path: '/account/details/',
  },
  {
    title: 'My Reviews',
    path: '/account/my-reviews/',
  },
  {
    title: 'Orders',
    path: '/account/orders/',
  },
  {
    title: 'Wishlist',
    path: '/account/wishlist/',
  },
];
