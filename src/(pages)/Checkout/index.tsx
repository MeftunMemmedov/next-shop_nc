'use client';
import CheckoutSteps from '@/components/CheckoutSteps';
import { getPriceDisplay, getProductPrice, getSubtotal } from '@/helpers';
import { CartItem } from '@/types';

const Checkout = ({ cart }: { cart: CartItem[] | null }) => {
  const detail_titles = ['Product', 'Subtotal'];
  const cartProducts = cart?.map((cartItem) => cartItem.product);
  return (
    <>
      <div className="mb-4 pb-5" />

      <section className="shop-checkout container mb-5">
        <h2 className="page-title">Checkout</h2>

        <CheckoutSteps currentStep={2} />

        {false ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <form name="checkout-form">
            {/* {errorMessages.non_field_errors && (
              <div className="border p-3 mt-1 bg-danger rounded text-light fw-bold">
                {errorMessages.non_field_errors}
              </div>
            )} */}
            <div className="checkout-form">
              <div className="billing-info__wrapper">
                <h4>Info</h4>

                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-floating my-3">
                          <input
                            type="text"
                            className={`form-control ${false ? 'border border-danger' : ''}`}
                            placeholder={'User name'}
                          />

                          <label
                            htmlFor="first_name"
                            className={`${false ? 'text-danger' : ''}`}>
                            User name *
                          </label>
                          {/* {errorMessages.first_name && (
                        <p className="text-danger">
                          {errorMessages.first_name}
                        </p>
                      )} */}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating my-3">
                          <input
                            type="tel"
                            className={`form-control ${false ? 'border border-danger' : ''}`}
                            placeholder={'Phone'}
                          />
                          <span className="country-code">+994</span>
                          <label
                            htmlFor="phone"
                            className={`${false ? 'text-danger' : ''}`}>
                            Phone *
                          </label>

                          {/* {errorMessages.phone && (
                        <p className="text-danger">{errorMessages.phone}</p>
                      )} */}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-floating my-3">
                          <input
                            type="email"
                            className={`form-control $false ? 'border border-danger' : ''}`}
                            placeholder={'Email'}
                          />
                          <label
                            htmlFor="email"
                            className={false ? 'text-danger' : ''}>
                            Email *
                          </label>
                          {/* {errorMessages.email && (
                        <p className="text-danger">{errorMessages.email}</p>
                      )} */}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mt-3">
                          <textarea
                            className="form-control form-control_gray"
                            placeholder={'Note'}
                            name="note"
                            cols={30}
                            rows={8}
                            defaultValue={''}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="checkout__totals-wrapper">
                      <div className="sticky-content">
                        <div className="checkout__totals">
                          <h3>Order Details</h3>
                          <table className="checkout-cart-items">
                            <thead>
                              <tr>
                                {detail_titles.map((title, index) => (
                                  <th key={index}>{title}</th>
                                ))}
                              </tr>
                            </thead>

                            <tbody>
                              {cart?.map((item) => (
                                <tr
                                  key={`cart-checkout-item-${item.product.slug}`}>
                                  <td>
                                    {item.product.title} ({item.quantity})
                                  </td>
                                  <td>
                                    {getPriceDisplay(
                                      getProductPrice(item.product) *
                                        item.quantity
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <table className="checkout-totals">
                            <tbody>
                              {/* <tr>
                          <th>{tCommon('cart.sub_total')}</th>
                          <td>{getPriceDisplay(total)}</td>
                        </tr> */}

                              {/* <tr>
                          <th>{t('details.shipping')}</th>
                          <td>{getPriceDisplay(shippingCost)}</td>
                        </tr> */}

                              <tr>
                                <th>Total</th>
                                <td>
                                  {cartProducts &&
                                    getPriceDisplay(getSubtotal(cartProducts))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-checkout d-flex justify-content-center align-items-center">
                          Checkout Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </>
  );
};

export default Checkout;
