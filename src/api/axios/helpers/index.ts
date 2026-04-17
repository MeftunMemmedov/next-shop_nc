import { TableName } from '@/types';
import axiosInstance from '..';

export const getDataList = async <T>(
  table_name: TableName,
  params?: Record<string, string | number | undefined>
) => {
  const { data } = await axiosInstance.get(`/${table_name}`, { params });

  return data as T[];
};
