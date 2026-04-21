import { apikey } from '..';

export const fetchInstance = async <T>(
  url: string,
  options: RequestInit = {}
) => {
  const defaultHeaders = {
    apikey: apikey || '',
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

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.error_description || data?.msg || 'Request failed');
  }

  return data as Promise<T>;
};
