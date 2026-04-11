import { Review } from '@/types';

import { faker } from '.';

export const createRandomReview = (): Review => {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    user: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    },
    rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
    content: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.future().toISOString(),
  };
};

export const REVIEWS: Review[] = Array.from({ length: 4 }, () =>
  createRandomReview()
);
