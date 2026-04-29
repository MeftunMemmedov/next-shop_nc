'use client';
import Spinner from '@/components/Spinner';
import { Link, useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '../../../actions/auth/login';
import { useForm } from 'react-hook-form';
import { LoginInput, loginSchema } from '../../../schemas/login.schema';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearLocalCart } from '@/store/inventory';

const SignIn = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { items, count } = useAppSelector(
    (store) => store.inventory.local.cart
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [successMessage, setSuccessMessage] = useState<{
    signin: string;
    cartSync?: string;
  }>({ signin: '', cartSync: '' });

  const onSubmit = handleSubmit(async (data: LoginInput) => {
    const res = await loginAction({ items, count }, data);

    const { status: signInStatus, message: signInMessage } = res.signin;

    if (signInStatus === 'failure') {
      setError('root', { message: signInMessage });
    }

    if (signInStatus === 'success') {
      setSuccessMessage((prevStatus) => ({
        ...prevStatus,
        signin: signInMessage,
      }));
      setTimeout(() => {
        dispatch(clearLocalCart());
        router.push('/');
      }, 1000);
    }

    const { status: cartSyncStatus, message: cartSyncMessage } = res.cartSync;

    if (cartSyncStatus === 'failure') {
      setError('root.cartSync', { message: cartSyncMessage });
    }

    if (cartSyncStatus === 'success') {
      setSuccessMessage((prevStatus) => ({
        ...prevStatus,
        cartSync: cartSyncMessage,
      }));
    }
  });

  return (
    <>
      <div className="mb-4 pb-4"></div>

      <section className="login-register container">
        <ul className="nav nav-tabs mb-5">
          <li className="nav-item">
            <a role="button" className="nav-link nav-link_underscore active">
              Sign In
            </a>
          </li>

          <li className="nav-item">
            <Link
              href="/auth/signup"
              className={`nav-link nav-link_underscore ${isSubmitting ? 'disabled-link' : ''}`}
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {isSubmitting && (
          <div className="d-flex flex-column align-items-center py-2 mb-2">
            <Spinner size={20} />
          </div>
        )}

        <div className="tab-content pt-2">
          <div className="tab-pane fade show active">
            <div className="login-form">
              <form onSubmit={onSubmit}>
                <div className="col-md-12">
                  {errors?.root && (
                    <div className="alert alert-danger my-3 " role="alert">
                      <p className="m-0 text-dark">{errors.root.message}</p>
                      {errors.root.cartSync && (
                        <p className="m-0 mt-2">
                          {errors.root.cartSync.message}
                        </p>
                      )}
                    </div>
                  )}
                  {Object.values(successMessage).some((val) => val !== '') && (
                    <div className="alert alert-success my-3" role="alert">
                      <p className="m-0 text-dark">{successMessage.signin}</p>
                      {successMessage.cartSync && (
                        <p className="m-0 mt-2">{successMessage.cartSync}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <input
                    {...register('email')}
                    className={`form-control form-control_gray ${errors.email ? 'is-invalid  invalid-input' : ''}`}
                    placeholder="Email"
                    disabled={isSubmitting}
                  />

                  <label>Email</label>

                  {errors?.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    {...register('password')}
                    type="password"
                    className={`form-control form-control_gray ${errors.password ? 'is-invalid  invalid-input' : ''}`}
                    placeholder={'Password'}
                    disabled={isSubmitting}
                  />

                  <label>Password</label>

                  {errors?.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="d-flex align-items-center mb-3 pb-2">
                  <div className="form-check mb-0">
                    <input
                      name="remember"
                      className="form-check-input form-check-input_fill"
                      type="checkbox"
                    />

                    <label className="form-check-label text-secondary">
                      Remember Me
                    </label>
                  </div>

                  {/* <Link to="/auth/reset-password" className="btn-text ms-auto">
                    Forgot Password
                  </Link> */}
                </div>

                <button
                  className="btn btn-primary w-100 text-uppercase"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Sign In'}
                </button>

                <div className="customer-option mt-4 text-center">
                  <span className="text-secondary">No account yet?</span>

                  <Link href="/auth/signup" className="btn-text">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-4 pb-4"></div>
    </>
  );
};

export default SignIn;
