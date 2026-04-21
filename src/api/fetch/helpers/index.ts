import { baseAuthURL, baseURL } from '@/api';
import { TableName } from '@/types';
import { fetchInstance } from '..';

export const fetchData = async <T>(
  table_name: TableName,
  params?: Record<string, string> | URLSearchParams | null,
  options: RequestInit = {}
) => {
  const url = `${baseURL}${table_name}${params ? `?${params instanceof URLSearchParams ? params.toString() : new URLSearchParams(params).toString()}` : ''}`;

  return (await fetchInstance<T>(url, {
    ...options,
  })) as T;
};

export const authFetch = async <T>(
  action: string,
  options: RequestInit = {}
) => {
  const url = `${baseAuthURL}${action}`;
  return await fetchInstance<T>(url, options);
};
