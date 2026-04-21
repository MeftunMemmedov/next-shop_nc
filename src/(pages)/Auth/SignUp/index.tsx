'use client';
import { Link } from '@/i18n/routing';
import { startTransition, useActionState, useEffect } from 'react';
import { registerAction } from '../../../actions/auth/register';
import { useForm } from 'react-hook-form';
import {
  RegisterInput,
  registerSchema,
} from '../../../schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp = () => {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const onSubmit = (data: RegisterInput) => {
    startTransition(() => {
      formAction(data);
    });
  };

  useEffect(() => {
    if (state?.success) {
      alert('Profile created! Please verify your email.');
      reset();
    }

    if (state?.error) {
      setError('root', { message: state.error });
    }
  }, [state]);

  return (
    <>
      <div className="mb-4 pb-4"></div>

      <section className="login-register container">
        <ul className="nav nav-tabs mb-5">
          <li className="nav-item">
            <Link
              className={`nav-link nav-link_underscore ${false ? 'disabled-link' : ''}`}
              href="/auth/signin"
            >
              Sign In
            </Link>
          </li>

          <li className="nav-item">
            <a role="button" className="nav-link nav-link_underscore active">
              Sign Up
            </a>
          </li>
        </ul>

        <div className="tab-content pt-2">
          <div className="tab-pane fade show active">
            <div className="register-form">
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
                    {...register('data.user_name')}
                    placeholder="User name"
                    className={`form-control form-control_gray ${errors.data?.user_name ? 'is-invalid  invalid-input' : ''}`}
                    disabled={isPending}
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
                    className={`form-control form-control_gray ${errors.password ? 'is-invalid  invalid-input' : ''}`}
                    placeholder="Password"
                    disabled={isPending}
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
                    className={`form-control form-control_gray ${errors.password ? 'is-invalid  invalid-input' : ''}`}
                    placeholder="Confirm password"
                    disabled={isPending}
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
                  className="btn btn-primary w-100 text-uppercase"
                  type="submit"
                >
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
