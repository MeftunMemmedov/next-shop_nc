import { Category } from '@/types';
import { fetchData } from '.';

export const getCategoryListwChildren = async () => {
  const categoryParams = {
    select: '*,children:shop_categories!parent_slug(*)',
    parent_slug: 'is.null',
  };
  const categories = await fetchData<Category[]>(
    'shop_categories',
    categoryParams,
    { next: { revalidate: 3600, tags: ['categories'] } }
  );

  return categories;
};
