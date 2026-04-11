import { Color } from '@/types/color';

import { faker } from '.';

export const createRandomColor = (): Color => {
  const title = faker.color.human();

  return {
    slug:
      faker.helpers.slugify(title) + faker.number.int({ min: 1, max: 1000 }),
    title: title,
    value: faker.color.rgb(),
  };
};

export const COLORS: Color[] = Array.from({ length: 10 }, () =>
  createRandomColor()
);
