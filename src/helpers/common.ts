// import { DefaultFilter } from '@/types';

export const getPageTitle = (title: string) => {
  // const PROJECT_NAME = import.meta.env.VITE_PROJECT_NAME as string;
  return `${title} | SHOP`;
};

export const getFormattedDate = (date: string, withTime = false) => {
  const dateObj = new Date(date);

  const result = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

  if (!withTime) return result;

  return `${result} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
};

export const getFilterParams = <
  Filter extends Record<string, string | object | number | boolean>,
>(
  filter: Filter
) => {
  const searchParams = new URLSearchParams();

  Object.keys(filter).forEach((key) => {
    const value = filter[key];
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((arrayValue) => {
          if (arrayValue !== undefined && arrayValue !== null) {
            searchParams.append(key, arrayValue.toString());
          }
        });
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  return searchParams.toString();
};
