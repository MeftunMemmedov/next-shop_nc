import { Brand } from '@/types/brand';

import { faker } from '.';

faker.seed(123);

export const createRandomBrand = (): Brand => {
  const title = faker.company.name();

  return {
    slug:
      faker.helpers.slugify(title) + faker.number.int({ min: 1, max: 1000 }),
    title: title,
  };
};

export const BRANDS: Brand[] = Array.from({ length: 10 }, () =>
  createRandomBrand()
);
