import { Size } from '../size';

export type Order = {
  id: number;
  payment_method: number;
  shipping_type: number;
  shippingCost: number;
  total: number;
  items: OrderItem[];
  status: {
    label: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'COMPLETED';
    value: string;
  };
  date: string;
  address: string;
  created_at: Date;
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
