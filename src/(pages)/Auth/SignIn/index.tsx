'use client';
import Spinner from '@/components/Spinner';
import { Link, useRouter } from '@/i18n/routing';
import { startTransition, useActionState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginAction } from '../../../actions/auth/login';
import { useForm } from 'react-hook-form';
import { LoginInput, loginSchema } from '../../../schemas/login.schema';

const SignIn = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, null);

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

  const onSubmit = (data: LoginInput) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state?.error) {
      setError('root', { message: state.error });
    }

    if (state?.success) {
      router.replace('/');
    }
  }, [state]);
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
              className={`nav-link nav-link_underscore ${isPending ? 'disabled-link' : ''}`}
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {(isPending || isSubmitting) && (
          <div className="d-flex flex-column align-items-center py-2 mb-2">
            <Spinner size={20} />
          </div>
        )}

        <div className="tab-content pt-2">
          <div className="tab-pane fade show active">
            <div className="login-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12">
                  {errors?.root && (
                    <div className={`alert alert-danger my-3`} role="alert">
                      {errors.root.message}
                    </div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <input
                    {...register('email')}
                    className={`form-control form-control_gray ${errors.email ? 'is-invalid  invalid-input' : ''}`}
                    placeholder="Email"
                    disabled={isPending}
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
                    disabled={isPending}
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

                {!state?.success && (
                  <button
                    className="btn btn-primary w-100 text-uppercase"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? 'Processing...' : 'Sign In'}
                  </button>
                )}

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
