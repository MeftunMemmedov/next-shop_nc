import { TableName } from '@/types';

export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/`;
export const baseAuthURL = `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/`;
export const apikey = process.env.NEXT_PUBLIC_API_KEY;
export const routeUrl = process.env.NEXT_PUBLIC_ROUTE_URL;

export const tableNames: Record<string, TableName> = {
  products: 'shop_products',
  categories: 'shop_categories',
  brands: 'shop_brands',
  profiles: 'shop_profiles',
};
