'use client';
import { Link, useRouter } from '@/i18n/routing';
import { registerAction } from '../../../actions/auth/register';
import { useForm } from 'react-hook-form';
import { RegisterInput, registerSchema } from '@/schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    setError,
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      data: {
        user_name: '',
      },
    },
  });

  const isFormLoading: boolean = isSubmitting || isLoading;

  const [successMessage, setSuccessMessage] = useState<string>('');

  const onSubmit = handleSubmit(async (data: RegisterInput) => {
    const res = await registerAction(data);
    const { status, message } = res;

    if (status === 'failure') {
      setError('root', { message });
      return;
    }
    if (status === 'success') {
      reset();
      setSuccessMessage(message);
      setTimeout(() => {
        router.push('/auth/signup');
      }, 1000);
    }
  });

  return (
    <>
      <div className="mb-4 pb-4"></div>

      <section className="login-register container">
        <nav>
          <ul className="nav nav-tabs mb-5">
            <li className="nav-item">
              <Link
                className={`nav-link nav-link_underscore ${isFormLoading ? 'disabled-link' : ''}`}
                href="/auth/signin">
                Sign In
              </Link>
            </li>

            <li className="nav-item">
              <a role="button" className="nav-link nav-link_underscore active">
                Sign Up
              </a>
            </li>
          </ul>
        </nav>

        <div className="tab-content pt-2">
          <div className="tab-pane fade show active" style={{ maxHeight: 500 }}>
            <div className="register-form">
              <form onSubmit={onSubmit}>
                <div className="col-md-12">
                  {errors?.root && (
                    <div className="alert alert-danger my-3" role="alert">
                      {errors.root.message}
                    </div>
                  )}
                  {successMessage !== '' && (
                    <div className="alert alert-success my-3" role="alert">
                      {successMessage}
                    </div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <input
                    {...register('email')}
                    placeholder="Email"
                    disabled={isFormLoading}
                    className={`form-control form-control_gray ${errors.email ? 'is-invalid  invalid-input' : ''}`}
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
                    {...register('data.user_name')}
                    placeholder="User name"
                    disabled={isFormLoading}
                    className={`form-control form-control_gray ${errors.data?.user_name ? 'is-invalid  invalid-input' : ''}`}
                  />
                  <label>User name</label>
                  {errors?.data?.user_name && (
                    <div className="invalid-feedback">
                      {errors.data?.user_name.message}
                    </div>
                  )}
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    {...register('password')}
                    type="password"
                    placeholder="Password"
                    disabled={isFormLoading}
                    className={`form-control form-control_gray ${errors.password ? 'is-invalid  invalid-input' : ''}`}
                  />

                  <label>Password</label>
                  {errors?.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    placeholder="Confirm password"
                    disabled={isFormLoading}
                    className={`form-control form-control_gray ${errors.password ? 'is-invalid  invalid-input' : ''}`}
                  />

                  <label>Confirm Password</label>
                  {errors?.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                <div className="pb-3"></div>
                <button
                  disabled={isFormLoading || successMessage !== ''}
                  className="btn btn-primary w-100 text-uppercase"
                  type="submit">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-4 pb-4"></div>
    </>
  );
};

export default SignUp;
