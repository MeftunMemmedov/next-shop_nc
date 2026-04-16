import { Image } from '../../common';
import { Category } from '../category';

export type Product = {
  id: string;
  slug: string;
  title: string;
  images: Image[];
  category: Category;
  is_new: boolean;
  is_featured: boolean;
  view_count: number;
  price: string;
  discount: number;
  description: string;
  discount_start_date: string;
  discount_end_date: string;
  quantity: number;
  rating: string;
  rating_count: number;
  in_wishlist?: boolean;
};

export type ProductFilter = DefaultFilter & {
  is_new?: boolean;
  category?: (string | number)[];
  price__gte?: number;
  price__lte?: number;
};

export type FilterParams = {
  category: string;
  price_gte: number;
  price_lte: number;
};
