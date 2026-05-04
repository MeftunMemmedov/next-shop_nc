'use client';
import { clearUserCartAction } from '@/actions/cart';
import { checkoutProductsAction } from '@/actions/checkout';
import CheckoutSteps from '@/components/CheckoutSteps';
import Spinner from '@/components/Spinner';
import { getPriceDisplay, getProductPrice, getSubtotal } from '@/helpers';
import { useRouter } from '@/i18n/routing';
import { CheckoutInput, checkoutSchema } from '@/schemas/checkout.schema';
import { CartItem, User } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Checkout = ({ cart, user }: { cart: CartItem[] | null; user: User }) => {
  const router = useRouter();
  const detail_titles = ['Product', 'Subtotal'];
  const [orderId] = useState(() => crypto.randomUUID());
  const cartProducts = cart?.map((cartItem) => cartItem.product);

  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      id: orderId,
      user_id: user.user_id || '',
      email: user.email || '',
      user_name: user.user_name || '',
      address: '',
      phone: '',
      note: '',
    },
  });

  const orderItems = cart?.map((cartItem) => ({
    product: cartItem.product.id,
    quantity: cartItem.quantity,
  }));

  const clearUserCart = async () => {
    try {
      await clearUserCartAction(orderItems!);
    } catch {
      return;
    }
  };

  const onSubmit = handleSubmit(async (data: CheckoutInput) => {
    const res = await checkoutProductsAction(data, orderItems!);

    const { status, message } = res;

    if (status === 'failure') {
      setError('root', { message });
      return;
    }

    if (status === 'success') {
      setSuccessMessage(message);
      clearUserCart();
      setTimeout(() => {
        router.push(`/order-complete?id=${orderId}`);
      }, 1000);
    }
  });

  return (
    <>
      <div className="mb-4 pb-5" />

      <section className="shop-checkout container mb-5">
        <h2 className="page-title">Checkout</h2>

        <CheckoutSteps currentStep={2} />

        {isSubmitting ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
              <Spinner />
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit}>
            {errors.root && (
              <div className="border p-3 mt-1 bg-danger rounded text-light fw-bold">
                {errors.root.message}
              </div>
            )}
            {successMessage !== '' && (
              <div className="border p-3 mt-1 bg-success rounded text-light fw-bold">
                {successMessage}
              </div>
            )}
            <div className="checkout-form">
              <div className="billing-info__wrapper">
                <h4>Info</h4>

                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-floating my-3">
                          <input
                            {...register('user_name')}
                            id="user_name"
                            className={`form-control ${errors.user_name ? 'border border-danger' : ''}`}
                            placeholder={'User name'}
                          />

                          <label
                            htmlFor="user_name"
                            className={`${errors.user_name ? 'text-danger' : ''}`}>
                            User name *
                          </label>
                          {errors.user_name && (
                            <p className="text-danger">
                              {errors.user_name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-floating my-3">
                          <input
                            {...register('phone')}
                            id="phone"
                            className={`form-control ${errors.phone ? 'border border-danger' : ''}`}
                            placeholder={'Phone'}
                          />
                          <label
                            htmlFor="phone"
                            className={`${errors.phone ? 'text-danger' : ''}`}>
                            Phone *
                          </label>

                          {errors.phone && (
                            <p className="text-danger">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-floating my-3">
                          <input
                            {...register('email')}
                            id="email"
                            className={`form-control ${errors.email ? 'border border-danger' : ''}`}
                            placeholder={'Email'}
                          />
                          <label
                            htmlFor="email"
                            className={errors.email ? 'text-danger' : ''}>
                            Email *
                          </label>
                          {errors.email && (
                            <p className="text-danger">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-floating my-3">
                          <input
                            {...register('address')}
                            id="address"
                            className={`form-control ${errors.address ? 'border border-danger' : ''}`}
                            placeholder={'Address'}
                          />
                          <label
                            htmlFor="address"
                            className={errors.address ? 'text-danger' : ''}>
                            Address *
                          </label>
                          {errors.address && (
                            <p className="text-danger">
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mt-3">
                          <textarea
                            {...register('note')}
                            className="form-control form-control_gray"
                            placeholder={'Note'}
                            cols={30}
                            rows={8}
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
