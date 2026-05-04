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
  id: string;
  phone: string;
  address: string;
  user_name: string;
  email: string;
  note: string;
  status: string;
  items: { product: Product; quantity: number }[];
  created_at: Date;
};
