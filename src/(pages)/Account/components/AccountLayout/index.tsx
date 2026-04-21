'use client';
import { LogoutIcon } from '@/assets/images/icons';
import { Link, usePathname } from '@/i18n/routing';
import { accountRoutes } from '@/constants';
import { ReactNode, useActionState } from 'react';
import { logoutAction } from '../../actions';

interface Props {
  children: ReactNode;
}

const AccountLayout = ({ children }: Props) => {
  const pathname = usePathname();

  const pageTitle =
    accountRoutes.find((route) => pathname === route.path)?.title || '';

  const [, formAction, isPending] = useActionState(logoutAction, {});

  return (
    <>
      <div className="mb-4 pb-4"></div>

      <section className="my-account container">
        <h2 className="page-title">{pageTitle}</h2>

        <div className="row">
          <div className="col-lg-3">
            <ul className="account-nav">
              {accountRoutes.map((route, index) => (
                <li key={`account-route-${index}`}>
                  <Link
                    href={route.path}
                    className={`menu-link menu-link_us-s ${
                      pathname.endsWith(route.path) ? 'menu-link_active' : ''
                    }`}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}

              <li>
                <form action={formAction}>
                  <button
                    className={`btn btn-transparent menu-link menu-link_us-s d-flex align-items-center gap-2 text-danger`}
                    type="submit"
                  >
                    <LogoutIcon />
                    <span>{isPending ? 'Logging out' : 'Logout'}</span>
                  </button>
                </form>
              </li>
            </ul>
          </div>

          <div className="col-lg-9">
            {true || pathname.endsWith('/wishlist/') ? (
              children
            ) : (
              <div className="text-center w-100 py-5 my-5">
                <p className="fs-4">
                  Please login to your account to see your data
                </p>
                <Link
                  href="/auth/signin"
                  className={`btn btn-dark ${false ? 'disabled-link' : ''}`}
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountLayout;
