import { Slide } from '@/types';

import { faker } from '.';
import { createFakeImage } from './image';

faker.seed(123);

export const createRandomSlide = (): Slide => {
  return {
    id: faker.number.int({ min: 1, max: 20 }),
    title: faker.word.words(2),
    image: createFakeImage(1920, 757),
    description: faker.lorem.sentence(20),
    url: '/',
  };
};

export const SLIDES: Slide[] = Array.from({ length: 3 }, () =>
  createRandomSlide()
);
