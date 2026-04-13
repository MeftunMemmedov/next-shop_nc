'use client';
import { LogoutIcon } from '@/assets/images/icons';
import { Link, usePathname } from '@/i18n/routing';
import { accountRoutes } from '@/constants';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AccountLayout = ({ children }: Props) => {
  const pathname = usePathname();

  const pageTitle =
    accountRoutes.find((route) => pathname === route.path)?.title || '';

  const logOut = () => {
    // const refresh = getRefreshToken();
    // dispatch(logout(refresh));
    // navigate('/');
    // dispatch(clearWishlist());
    // dispatch(clearCart());
    // window.location.reload();
  };

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

              {false && (
                <li>
                  <button
                    className={`btn btn-transparent menu-link menu-link_us-s d-flex align-items-center gap-2 text-danger`}
                    onClick={logOut}
                  >
                    <LogoutIcon />
                    <span>Logout</span>
                  </button>
                </li>
              )}
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
