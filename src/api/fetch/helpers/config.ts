import { Config } from '@/types';
import { getData } from './get';

export const getConfig = async () => {
  return await getData<Config>(
    'shop_config',
    { select: '*' },
    { next: { revalidate: 3600 } }
  );
};
