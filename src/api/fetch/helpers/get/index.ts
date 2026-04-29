import { baseURL } from '@/api';
import { TableName } from '@/types';
import { fetchInstance } from '../..';

const get = async <T>(
  table_name: TableName,
  params?: Record<string, string> | URLSearchParams | null,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${baseURL}${table_name}${params ? `?${params instanceof URLSearchParams ? params.toString() : new URLSearchParams(params).toString()}` : ''}`;

  const response = await fetchInstance(url, {
    ...options,
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.msg || 'An error occured whilte get data');
  }

  return data as T;
};

export const getDatalist = async <T>(
  table_name: TableName,
  params?: Record<string, string> | URLSearchParams | null,
  options: RequestInit = {}
): Promise<T[]> => {
  return await get(table_name, params, options);
};

export const getData = async <T>(
  table_name: TableName,
  params?: Record<string, string> | URLSearchParams | null,
  options: RequestInit = {}
): Promise<T> => {
  return await get(table_name, params, {
    ...options,
    headers: {
      ...options.headers,
      Accept: 'application/vnd.pgrst.object+json',
    },
  });
};
