import { baseURL } from '@/api';
import { TableName } from '@/types';
import { getHeaders } from '..';

export const fetchDatalist = async <T>(
  table_name: TableName,
  params?: URLSearchParams | null,
  nextOptions: {
    revalidate?: number | false;
    tags?: string[];
  } = { revalidate: false }
) => {
  const res = await fetch(
    `${baseURL}${table_name}${params ? `?${params}` : ''}`,
    {
      method: 'GET',
      headers: getHeaders(),
      next: {
        revalidate: nextOptions.revalidate,
        tags: nextOptions.tags,
      },
      cache: nextOptions.revalidate === 0 ? 'no-store' : 'force-cache',
    }
  );

  if (!res.ok) throw new Error('Fetch Failed');

  return res.json() as Promise<T[]>;
};

export const fetchDatadetails = async <T>(
  table_name: TableName,
  params?: string,
  nextOptions: {
    revalidate?: number | false;
    tags?: string[];
  } = { revalidate: false }
) => {
  const res = await fetch(
    `${baseURL}${table_name}${params ? `?${params}` : ''}`,
    {
      method: 'GET',
      headers: { ...getHeaders(), Accept: 'application/vnd.pgrst.object+json' },
      next: {
        revalidate: nextOptions.revalidate,
        tags: nextOptions.tags,
      },
      cache: nextOptions.revalidate === 0 ? 'no-store' : 'force-cache',
    }
  );

  if (!res.ok) throw new Error('Fetch Failed');

  return res.json() as Promise<T>;
};
