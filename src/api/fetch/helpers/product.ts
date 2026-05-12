import { Product } from '@/types';
import { getData } from './get';

export const getProduct = (slug: string) => {
  return getData<Product>(
    'shop_products',
    {
      slug: `eq.${slug}`,
    },
    {
      next: {
        revalidate: 3000,
        tags: ['product', `product-${slug}`],
      },
    }
  );
};
