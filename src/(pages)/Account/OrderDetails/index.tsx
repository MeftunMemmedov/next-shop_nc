import { OrderItem } from '@/types';

const OrderDetails = ({ order }: { order: OrderItem }) => {
  console.log(order);
  return <div>OrderDetails</div>;
};

export default OrderDetails;
