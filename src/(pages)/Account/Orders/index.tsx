import Spinner from '@/components/Spinner';
import { ORDER_STATUS } from '@/constants/orderStatus';
import { ORDERS } from '@/data/order';
import { getPriceDisplay } from '@/helpers';
import { Link } from '@/i18n/routing';
import { format } from 'date-fns';

const Orders = () => {
  const table_headings = ['Order №', 'Date', 'Status', 'Total', 'Actions'];
  return (
    <div className="page-content my-account__orders-list">
      {false ? (
        <Spinner size={60} />
      ) : ORDERS && ORDERS.length > 0 ? (
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
              {ORDERS.map((order) => (
                <tr key={`order-${order.id}`}>
                  <td>
                    <Link href={`/orders/${order.id}`}>#{order.id}</Link>
                  </td>
                  <td>{format(order.created_at, 'dd/MM/yyyy')}</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        backgroundColor: ORDER_STATUS.find(
                          (status) => status.label === order.status.value
                        )?.color,
                      }}
                    >
                      {order.status.label}
                    </span>
                  </td>
                  <td>
                    {`${getPriceDisplay(+order.total)} for ${order.items.length} items`}
                  </td>
                  <td>
                    <Link
                      href={`/orders/${order.id}`}
                      className="btn btn-primary"
                    >
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
