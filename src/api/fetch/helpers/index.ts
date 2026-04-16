import { baseURL } from '@/api';
import { TableName } from '@/types';
import { getHeaders } from '..';

export const fetchDatalist = async <T>(
  table_name: TableName,
  params?: URLSearchParams,
  nextOptions: {
    revalidate: number;
    cache: RequestCache;
  } = { revalidate: 0, cache: 'no-store' }
) => {
  const res = await fetch(
    `${baseURL}${table_name}${params ? `?${params}` : ''}`,
    {
      method: 'GET',
      headers: getHeaders(),
      next: {
        revalidate: nextOptions.revalidate,
      },
      cache: nextOptions.cache,
    }
  );

  if (!res.ok) throw new Error('Fetch Failed');

  return res.json() as Promise<T[]>;
};
