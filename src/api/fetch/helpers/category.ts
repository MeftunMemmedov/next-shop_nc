import { Category } from '@/types';
import { getDatalist } from './get';

export const getCategoryListwChildren = async () => {
  const categoryParams = {
    select: '*,children:shop_categories!parent_slug(*)',
    parent_slug: 'is.null',
  };

  const categories = await getDatalist<Category>(
    'shop_categories',
    categoryParams,
    { next: { revalidate: 3600, tags: ['categories'] } }
  );

  return categories;
};
