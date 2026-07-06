import { cookies } from 'next/headers';
import { apikey } from '..';

export const fetchInstance = async (url: string, options: RequestInit = {}) => {
  const access_token = (await cookies()).get('access')?.value;
  const defaultHeaders = {
    apikey: apikey!,
    Authorization: access_token ? `Bearer ${access_token}` : `Bearer ${apikey}`,
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
