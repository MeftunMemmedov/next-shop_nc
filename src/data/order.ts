import { Order } from '@/types';

import { faker } from '.';
import { createRandomProduct } from './product';
import { SIZES } from './size';

faker.seed(123);

export const createRandomOrder = (): Order => {
  return {
    id: faker.number.int({ min: 1, max: 100 }),
    date: faker.date.recent({ days: 10 }).toISOString(),
    total: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
    status: {
      label: faker.helpers.arrayElement([
        'PENDING',
        'ACCEPTED',
        'IN_PROGRESS',
        'COMPLETED',
      ]),
      value: 'pending',
    },
    payment_method: faker.number.int({ min: 0, max: 1 }),
    shipping_type: faker.number.int({ min: 0, max: 1 }),
    shippingCost: faker.number.float({ min: 0, max: 10, fractionDigits: 2 }),
    address: faker.location.street(),
    created_at: faker.date.anytime(),
    items: Array.from({ length: 2 }, () => ({
      product: createRandomProduct(),
      size: faker.helpers.arrayElement(SIZES),
      price: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
      discount: faker.number.float({ min: 0, max: 50 }),
      quantity: faker.number.int({ min: 1, max: 10 }),
    })),
    history: Array.from({ length: 2 }, () => ({
      title: faker.lorem.words(3),
      date: faker.date.recent({ days: 10 }).toISOString(),
    })),
  };
};

export const ORDERS: Order[] = Array.from({ length: 4 }, () =>
  createRandomOrder()
);
