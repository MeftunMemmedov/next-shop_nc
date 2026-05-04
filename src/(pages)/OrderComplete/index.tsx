import { ConfirmIcon } from '@/assets/images/icons';
import CheckoutSteps from '@/components/CheckoutSteps';
import { formattedDate, getPriceDisplay, getProductPrice } from '@/helpers';
import { Link } from '@/i18n/routing';
import { OrderItem } from '@/types';
import { getLocale } from 'next-intl/server';

const OrderComplete = async ({ orderDetails }: { orderDetails: OrderItem }) => {
  const locale = await getLocale();
  const total = orderDetails.items.reduce((acc, item) => {
    return acc + getProductPrice(item.product) * item.quantity;
  }, 0);

  return (
    <main>
      <section className="shop-checkout container">
        <h2 className="page-title">Order Received</h2>
        <CheckoutSteps currentStep={3} />
        <div className="order-complete">
          <div className="order-complete__message">
            <ConfirmIcon />
            <h3>Your order is completed!</h3>
            <p>Thank you. Your order has been received.</p>
          </div>
          <div className="order-info">
            <div className="order-info__item">
              <label>Order Number</label>
              <span>{orderDetails.id}</span>
            </div>
            <div className="order-info__item">
              <label>Date</label>
              <span>{formattedDate(orderDetails.created_at, locale)}</span>
            </div>
            <div className="order-info__item">
              <label>Total</label>
              <span>{getPriceDisplay(total)}</span>
            </div>
            <div className="order-info__item">
              <label>Paymetn Method</label>
              <span>Direct Bank Transfer</span>
            </div>
          </div>
          <div className="checkout__totals-wrapper">
            <div className="checkout__totals">
              <h3>Order Details</h3>
              <table className="checkout-cart-items">
                <thead>
                  <tr>
                    <th>PRODUCT</th>
                    <th>SUBTOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((orderItem) => (
                    <tr
                      key={`order-item-${orderItem.product.id}-${orderDetails.id}`}>
                      <td>
                        {orderItem.product.title}({`${orderItem.quantity}X`})
                      </td>
                      <td>
                        {getPriceDisplay(
                          getProductPrice(orderItem.product) *
                            orderItem.quantity
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <table className="checkout-totals">
            <tbody>
            <tr>
            <th>SUBTOTAL</th>
            <td>$62.40</td>
              </tr>
              <tr>
              <th>SHIPPING</th>
                <td>Free shipping</td>
                </tr>
              <tr>
              <th>VAT</th>
              <td>$19</td>
              </tr>
              <tr>
              <th>TOTAL</th>
              <td>$81.40</td>
              </tr>
              </tbody>
              </table> */}
              <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                <Link href="/" className="btn btn-dark">
                  Home
                </Link>
                <Link href="/products" className="btn btn-warning">
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderComplete;
