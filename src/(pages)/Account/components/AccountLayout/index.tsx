'use client';
import { LogoutIcon } from '@/assets/images/icons';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { accountRoutes } from '@/constants';
import { ReactNode, useTransition } from 'react';
import { logoutAction } from '@/actions/auth/logout';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearUser, clearUserCart } from '@/store/inventory';
import { toast } from 'react-toastify';

interface Props {
  children: ReactNode;
}

const AccountLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const route = useRouter();

  const dispatch = useAppDispatch();
  const { info, isAuth } = useAppSelector((store) => store.inventory.user);

  const pageTitle =
    accountRoutes.find((route) => pathname === route.path)?.title || '';

  const [isLogoutPending, startLogoutTransition] = useTransition();

  const handleLogout = () => {
    startLogoutTransition(async () => {
      const res = await logoutAction();

      const { status, message } = res;
      if (status === 'success') {
        dispatch(clearUserCart());
        dispatch(clearUser());
        toast.success(message);
        route.replace('/');
      }

      if (status === 'failure') {
        toast.error(message);
        return;
      }
    });
  };

  return (
    <>
      <div className="mb-4 pb-4"></div>

      <section className="my-account container">
        <div className="d-flex align-items-center">
          <h2 className="page-title me-4">{pageTitle}</h2>
          {!pathname.endsWith('/account/details/') && (
            <div className="d-flex align-items-center gap-3 fw-bold">
              <span>{info?.user_name}</span>
              <span>{info?.email}</span>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-lg-3">
            <ul className="account-nav">
              {accountRoutes.map((route, index) => (
                <li key={`account-route-${index}`}>
                  <Link
                    href={route.path}
                    className={`menu-link menu-link_us-s ${
                      pathname.endsWith(route.path) ? 'menu-link_active' : ''
                    }`}>
                    {route.title}
                  </Link>
                </li>
              ))}

              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-transparent menu-link menu-link_us-s d-flex align-items-center gap-2 text-danger">
                  <LogoutIcon />
                  <span>{isLogoutPending ? 'Logging out' : 'Logout'}</span>
                </button>
              </li>
            </ul>
          </div>

          <div className="col-lg-9">
            {isAuth || pathname.endsWith('/wishlist/') ? (
              children
            ) : (
              <div className="text-center w-100 py-5 my-5">
                <p className="fs-4">
                  Please login to your account to see your data
                </p>
                <Link
                  href="/auth/signin"
                  className={`btn btn-dark ${false ? 'disabled-link' : ''}`}>
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
