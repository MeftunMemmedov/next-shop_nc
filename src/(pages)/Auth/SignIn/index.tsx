'use client';
import Spinner from '@/components/Spinner';
import { Link } from '@/i18n/routing';

const SignIn = () => {
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
              className={`nav-link nav-link_underscore ${false ? 'disabled-link' : ''}`}
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {false && (
          <div className="d-flex flex-column align-items-center py-2 mb-2">
            <Spinner size={20} />
          </div>
        )}

        <div className="tab-content pt-2">
          <div className="tab-pane fade show active">
            <div className="login-form">
              <form>
                <div className="col-md-12">
                  {/* {errors?.data.detail && (
                    <div className={`alert alert-danger my-3`} role="alert">
                      {errors?.data.detail}
                    </div>
                  )} */}
                </div>

                <div className="form-floating mb-3">
                  {/* <InputMask
                    showMask
                    mask="+994 (__) ___ __ __"
                    type="text"
                    id="phone"
                    className={`form-control form-control_gray ${false ? 'is-invalid  invalid-input' : ''}`}
                    name="phone"
                    replacement={{ _: /\d/ }}
                  /> */}
                  <input
                    name="phone"
                    type="tel"
                    className={`form-control form-control_gray ${false ? 'is-invalid  invalid-input' : ''}`}
                    placeholder="Phone"
                  />

                  {/* <span className="country-code">+994</span> */}
                  <label>Phone</label>

                  {/* {errors?.data.phone && (
                    <div className="invalid-feedback">{errors.data.phone}</div>
                  )} */}
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    name="password"
                    type="password"
                    className={`form-control form-control_gray ${false ? 'is-invalid  invalid-input' : ''}`}
                    placeholder={'Password'}
                  />

                  <label>Password</label>

                  {/* {errors?.data.password && (
                    <div className="invalid-feedback">
                      {errors.data.password}
                    </div>
                  )} */}
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
                >
                  Sign In
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
