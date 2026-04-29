import { TableName } from '@/types';
import { baseURL } from '@/api';
import { fetchInstance } from '../..';

const mutate = async (
  table_name: TableName,
  options: RequestInit = {},
  params?: Record<string, string> | URLSearchParams | undefined
): Promise<void> => {
  const url = `${baseURL}${table_name}${params ? `?${params instanceof URLSearchParams ? params.toString() : new URLSearchParams(params).toString()}` : ''}`;

  const response = await fetchInstance(url, {
    ...options,
  });

  if (!response.ok) {
    throw new Error('An error occured while mutate data');
  }
};

export const postData = async <T>(
  table_name: TableName,
  body: T,
  options: RequestInit = {}
) => {
  await mutate(table_name, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const patchData = async <T>(
  table_name: TableName,
  body: T,
  options: RequestInit = {},
  params?: Record<string, string> | URLSearchParams
) => {
  await mutate(
    table_name,
    {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    },
    params
  );
};

export const deleteData = async (
  table_name: TableName,
  options: RequestInit = {},
  params?: Record<string, string> | URLSearchParams
) => {
  await mutate(
    table_name,
    {
      ...options,
      method: 'DELETE',
    },
    params
  );
};
