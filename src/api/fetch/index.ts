import { apikey } from '..';

export const fetchInstance = async (url: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    apikey: apikey!,
    Authorization: `Bearer ${apikey}`,
    'Content-Type': 'application/json',
  };
  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  return response;
};
