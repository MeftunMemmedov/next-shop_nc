import { Product } from '@/types';

export const getProductPrice = (product: Product) => {
  return +product.price - +product.discount;
};

export const getPriceDisplay = (
  value: number | Product,
  withFixed: boolean = true
) => {
  let price: number = 0;
  if (typeof value === 'object') price = getProductPrice(value);
  else price = value;

  if (!withFixed) return `${Number(price)} AZN`;

  return `${price.toFixed(2)} AZN`;
};

export const getSubtotal = (items: Product[]) => {
  return items.reduce((acc, item) => {
    return acc + getProductPrice(item);
  }, 0);
};
