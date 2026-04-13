'use client';
import Spinner from '@/components/Spinner';
import { Link } from '@/i18n/routing';

const SignUp = () => {
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
        {false && (
          <div className="d-flex flex-column align-items-center py-2 mb-2">
            <Spinner size={20} />
          </div>
        )}

        <div className="tab-content pt-2">
          <div className="tab-pane fade show active">
            <div className="register-form">
              <form>
                <div className="col-md-12"></div>

                <div className="form-floating mb-3">
                  <input
                    name="email"
                    type="email"
                    className={`form-control form-control_gray ${false ? 'is-invalid  invalid-input' : ''}`}
                    placeholder="Email"
                  />

                  <label>Email</label>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    className={`form-control form-control_gray ${false ? 'is-invalid  invalid-input' : ''}`}
                  />
                  <label>Phone</label>
                </div>

                <div className="pb-3"></div>

                <div className="form-floating mb-3">
                  <input
                    className={`form-control form-control_gray ${false ? 'is-invalid  invalid-input' : ''}`}
                    name="password"
                    placeholder="Password"
                    type="password"
                  />

                  <label>Password</label>
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
