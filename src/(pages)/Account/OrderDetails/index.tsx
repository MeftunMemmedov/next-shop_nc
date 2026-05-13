import { formattedDate } from '@/helpers';
import { OrderItem } from '@/types';
import Tabs from './Tabs';

interface Props {
  order: OrderItem;
  locale: string;
}

const OrderDetails = ({ order, locale }: Props) => {
  return (
    <section>
      <div className="container mt-5 p-0 order-details-page">
        <div className="row">
          <div className="col-lg-12 p-0">
            <div className="wd-form-order">
              <div className="order-head">
                <div className="content">
                  <div className="badge mb-2">{order.status}</div>
                  <h6 className="mt-8 fw-5">Order #{order?.id}</h6>
                </div>
              </div>

              <div className="tf-grid-layout md-col-2 gap-15">
                <div className="item">
                  <div className="text-2 text_black-2">Order Created</div>
                  <div className="text-2 mt_4 fw-6">
                    {formattedDate(order.created_at, locale)}
                  </div>
                </div>

                <div className="item">
                  <div className="text-2 text_black-2">Address</div>
                  <div className="text-2 mt_4 fw-6">{order.address}</div>
                </div>

                <div className="item">
                  <div className="text-2 text_black-2">Note</div>
                  <div className="text-2 mt_4 fw-6">{order.note}</div>
                </div>
              </div>

              <Tabs order={order} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
