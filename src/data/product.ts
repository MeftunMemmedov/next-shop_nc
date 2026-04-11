import { Product } from '@/types';

import { faker } from '.';
import { createRandomCategory } from './category';
import { createFakeImage } from './image';

faker.seed(123);

export const createRandomProduct = () // depth: number = 1
: Product => {
  const title = faker.commerce.productName();

  return {
    id: 'asdas',
    slug:
      faker.helpers.slugify(title) + faker.number.int({ min: 1, max: 1000 }),
    title: title,
    category: createRandomCategory(),
    discount: faker.number.int({ min: 0, max: 50 }),
    price: faker.number
      .float({ min: 10, max: 100, fractionDigits: 2 })
      .toString(),
    rating: faker.number
      .float({ min: 1, max: 5, fractionDigits: 1 })
      .toString(),
    is_new: faker.datatype.boolean(),
    images: Array.from(
      { length: faker.number.int({ min: 2, max: 5 }) },
      () => ({
        id: faker.number.int(),
        url: createFakeImage(700, 700),
      })
    ),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 0, max: 50 }),
    is_featured: faker.datatype.boolean({ probability: 0.75 }),
    view_count: faker.number.int({ min: 2, max: 15 }),
    rating_count: faker.number.int({ min: 2, max: 15 }),
    discount_end_date: '',
    discount_start_date: '',
  };
};

export const PRODUCTS: Product[] = Array.from({ length: 10 }, () =>
  createRandomProduct()
);
