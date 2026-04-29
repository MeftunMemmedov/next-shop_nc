import { Category } from '@/types';

import { faker } from '.';
import { createFakeImage } from './image';

faker.seed(123);

export const createRandomCategory = (level = 0): Category => {
  const title = faker.commerce.product();

  const category: Category = {
    id: '',
    title: title,
    image: createFakeImage(80, 80),
    slug:
      faker.helpers.slugify(title) + faker.number.int({ min: 1, max: 1000 }),
    children: [],
    parent_slug: null,
    is_featured: true,
  };

  if (level < 3) {
    category.children = Array.from(
      { length: faker.number.int({ min: 5, max: 10 }) },
      () => createRandomCategory(level + 1)
    );
  }

  return category;
};

export const CATEGORIES: Category[] = Array.from({ length: 6 }, () =>
  createRandomCategory()
);
