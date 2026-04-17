import { Category } from '@/types';
import { fetchDatalist } from '.';

export const getCategoryListwChildren = async () => {
  const categoryParams = new URLSearchParams({
    select: '*,children:shop_categories!parent_slug(*)',
    parent_slug: 'is.null',
  });
  const categories = await fetchDatalist<Category>(
    'shop_categories',
    categoryParams,
    { tags: ['categories'] }
  );

  return categories;
};
