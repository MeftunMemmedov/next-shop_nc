'use client';
import { getPriceDisplay, getProductPrice } from '@/helpers';
import { OrderItem } from '@/types';
import Image from 'next/image';
import { useState } from 'react';

const Tabs = ({ order }: { order: OrderItem }) => {
  // const tab_titles = ['Products', 'Subtotal'];
  const [activeTab] = useState<string>('products');

  // const orderItems = order.items.map((orderItem) => orderItem.product);
  return (
    <div className="widget-tabs style-has-border widget-order-tab my-5">
      <div className="widget-content-tab">
        <div
          className={`widget-content-inner ${activeTab === 'products' ? 'active' : ''}`}>
          {order.items.map((item, index) => (
            <div
              className="order-head d-flex flex-md-row flex-column align-items-md-start"
              key={`order-item-${item.product}-${index}`}>
              <div className="img-product mt-md-1">
                <Image
                  src={item.product.images[0]}
                  width={50}
                  height={50}
                  className="object-fit-contain"
                  alt=""
                />
              </div>

              <div className="content">
                <div className="text-2 fw-6">{item.product.title}</div>

                <div className="mt_4">
                  <span className="fw-6">Price: </span>
                  {+item.product.discount > 0 && (
                    <span className="text-decoration-line-through me-1 text-secondary">
                      {getPriceDisplay(item.product.price)}
                    </span>
                  )}
                  <span>{getPriceDisplay(item.product)}</span>
                </div>

                <div className="mt_4">
                  <span className="fw-6">Quantity : </span>
                  {item.quantity}
                </div>
                <div className="mt_4">
                  <span className="fw-6">Subtotal : </span>
                  {getPriceDisplay(
                    getProductPrice(item.product) * item.quantity
                  )}
                </div>
              </div>
            </div>
          ))}

          <ul className="list-unstyled ps-md-5 ps-0">
            <li className="d-flex justify-content-between text-2">
              <span>Total:</span>

              <span className="fw-6">
                {getPriceDisplay(
                  order.items.reduce((acc, item) => {
                    return acc + getProductPrice(item.product) * item.quantity;
                  }, 0)
                )}
              </span>
            </li>

            <hr />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
