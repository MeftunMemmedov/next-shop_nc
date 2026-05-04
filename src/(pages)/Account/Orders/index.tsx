import Spinner from '@/components/Spinner';
import { getSubtotal } from '@/helpers';
import { Link } from '@/i18n/routing';
import { OrderItem } from '@/types';
import { format } from 'date-fns';

const Orders = ({ orders }: { orders: OrderItem[] }) => {
  const table_headings = ['Order №', 'Date', 'Status', 'Total', 'Actions'];

  return (
    <div className="page-content my-account__orders-list">
      {false ? (
        <Spinner size={60} />
      ) : orders && orders.length > 0 ? (
        <>
          <table className="orders-table">
            <thead>
              <tr>
                {table_headings.map((heading, index) => (
                  <th key={`table-heading-${index}`}>{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={`order-${order.id}`}>
                  <td>
                    <Link href={`/account/orders/${order.id}`}>
                      #{order.id}
                    </Link>
                  </td>
                  <td>{format(order.created_at, 'dd/MM/yyyy')}</td>
                  <td>
                    <span className="badge">{order.status}</span>
                  </td>
                  <td>
                    {`${getSubtotal(order.items.map((orderItems) => orderItems.product))} for ${order.items.length} items`}
                  </td>
                  <td>
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="btn btn-primary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5">
            {/* <Pagination count={orders.count || 0} /> */}
          </div>
        </>
      ) : (
        <div className="text-center w-100 py-5">
          <p className="fs-2">No order found</p>
        </div>
      )}
    </div>
  );
};

export default Orders;
