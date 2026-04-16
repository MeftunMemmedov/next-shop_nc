import { apikey } from '..';

export const getHeaders = (): HeadersInit => {
  return {
    apikey: apikey ?? '',
    Authorization: `Bearer ${apikey}`,
    'Content-Type': 'application/json',
  };
};
