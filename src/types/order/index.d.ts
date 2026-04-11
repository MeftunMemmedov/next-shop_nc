import { Size } from '../size';

export type Order = {
  id: number;
  payment_method: number;
  shipping_type: number;
  status: number;
  shippingCost: number;
  total: number;
  items: OrderItem[];
  status: number;
  date: string;
  address: string;
  history: {
    title: string;
    date: string;
  }[];
};

export type OrderItem = {
  product: Product;
  size: Size;
  price: number;
  discount: number;
  quantity: number;
};
