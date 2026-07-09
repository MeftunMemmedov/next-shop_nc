'use client';
import {
  LoginIcon,
  MenuIcon,
  // NextIcon,
  PrevIcon,
  SearchIcon,
  UserIcon,
} from '@/assets/images/icons';
import { routes } from '@/constants';
import { SubmitEvent, useEffect, useState } from 'react';
import CartModal from '../CartModal';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import LangSelect from '../LangSelect';
// import { Category, Config, UserAuthState } from '@/types';
import { useAppSelector } from '@/store/hooks';
import Logo from '../Logo';

// interface Props {
//   categories: Category[];
//   user: UserAuthState | null;
//   config: Config;
// }

const MobileHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { isAuth } = useAppSelector((store) => store.inventory.user);

  // const { contact_info } = config;

  const [menu, setMenu] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<number[]>([-1, -1]);

  const [searchInput, setSearchInput] = useState<string>('');

  const toggleMenu = (index1: number, index2: number = -1) => {
    setActiveMenu((prev) => {
      if (prev[0] === index1 && prev[1] === index2) {
        return [-1, -1];
      }
      return [index1, index2];
    });
  };

  const isActive = (index1: number, index2: number = -1) => {
    return (
      (activeMenu[0] === index1 && activeMenu[1] === index2) ||
      (activeMenu[0] === index1 && index2 === -1)
    );
  };

  const handleSearchFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    router.push(`/products?search=${searchInput}`);
    setMenu(false);
  };

  useEffect(() => {
    if (menu) {
      document.body.classList.add('mobile-menu-opened');
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('mobile-menu-opened');
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('mobile-menu-opened');
      document.body.classList.remove('overflow-hidden');
    };
  }, [menu]);

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  return (
    <div
      className="header-mobile header_sticky position-absolute"
      style={{ paddingRight: menu ? '0px' : '' }}>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-5 d-flex align-items-center">
            <button
              className="mobile-nav-activator d-block position-relative btn p-0"
              onClick={() => setMenu((prevState) => !prevState)}>
              <MenuIcon className="nav-icon" />
              <span className="btn-close-lg position-absolute top-0 start-0 w-100"></span>
            </button>
          </div>
          <div className="col-2 d-flex jsutify-content-center align-items-center">
            <Logo />
          </div>
          <div className="col-5 d-flex align-items-center justify-content-end">
            <CartModal />
          </div>
        </div>
      </div>

      <nav className="header-mobile__navigation navigation d-flex flex-column w-100 position-absolute top-100 bg-body overflow-auto">
        <div className="container pb-5">
          <form
            className="search-field position-relative mt-4 mb-3"
            onSubmit={handleSearchFormSubmit}>
            <div className="position-relative">
              <input
                className="search-field__input w-100 border rounded-1"
                type="text"
                placeholder={'What are you looking for?'}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <button
                className="btn-icon search-popup__submit pb-0 me-2"
                type="submit">
                <SearchIcon className="ms-auto" />
              </button>

              <button
                className="btn-icon btn-close-lg search-popup__reset pb-0 me-4"
                type="reset"></button>
            </div>

            <div className="position-absolute start-0 top-100 m-0 w-100">
              <div className="search-result"></div>
            </div>
          </form>
        </div>

        <nav className="container">
          <div className="overflow-hidden">
            <ul
              className="navigation__list list-unstyled position-relative"
              style={{
                transform:
                  activeMenu[0] !== -1
                    ? activeMenu[1] !== -1
                      ? 'translateX(-200%)'
                      : 'translateX(-100%)'
                    : '',
                minHeight: !isActive(-1) ? '858px' : '',
              }}>
              {routes.map((route, index) => (
                <li
                  className="navigation__item"
                  key={`mobile-navlink-${index}`}>
                  <div
                    className={`${route.path === '/products' ? 'd-flex align-items-center justify-content-between' : ''}`}>
                    <Link href={route.path} className="navigation__link">
                      {route.title}
                    </Link>
                    {/* {route.path === '/products' &&
                      !pathname.endsWith('/products') && (
                        <NextIcon
                          className="ms-auto"
                          onClick={() => toggleMenu(2)}
                        />
                      )} */}
                  </div>
                  {route.path === '/products' &&
                    !pathname.endsWith('/products') && (
                      <div
                        className={`sub-menu position-absolute top-0 start-100 w-100 ${isActive(2) ? '' : 'd-none'}`}>
                        <button
                          onClick={() => toggleMenu(2)}
                          className="navigation__link d-flex align-items-center border-bottom mb-3 btn px-0 w-100">
                          <PrevIcon className="me-2" />
                          {route.title}
                        </button>

                        {/* <div className="sub-menu__wrapper">
                          {categories?.map((category, index1) => (
                            <Fragment key={index1}>
                              <div className="navigation__link d-flex align-items-center">
                                <Link
                                  href={`/products?category=${category.slug}`}
                                  prefetch={false}>
                                  {category.title}
                                </Link>
                                {category.children?.length && (
                                  <NextIcon
                                    className="ms-auto"
                                    onClick={() => toggleMenu(2, index1)}
                                  />
                                )}
                              </div>

                              {category.children && (
                                <div
                                  className={`sub-menu__wrapper position-absolute top-0 start-100 w-100 ${isActive(2, index1) ? '' : 'd-none'}`}>
                                  <button
                                    className="navigation__link d-flex align-items-center border-bottom mb-2 btn p-0"
                                    onClick={() => toggleMenu(2)}>
                                    <PrevIcon className="me-2" />
                                    {category.title}
                                  </button>

                                  <ul className="sub-menu__list list-unstyled">
                                    {category.children.map(
                                      (child: Category) => (
                                        <li
                                          className="sub-menu__item"
                                          key={`childcategory--${child.slug}`}>
                                          <Link
                                            href={`/products?category=${child.slug}`}
                                            prefetch={false}
                                            className="menu-link menu-link_us-s">
                                            {child.title}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                            </Fragment>
                          ))}
                        </div> */}
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="border-top mt-auto pb-5">
          <Link
            href={isAuth ? '/account/details' : '/auth/signin'}
            className="customer-links container mt-4 mb-2 pb-1">
            {isAuth ? (
              <UserIcon className="d-inline-block align-middle" />
            ) : (
              <LoginIcon className="d-inline-block align-middle" />
            )}

            <span className="d-inline-block ms-2 text-uppercase align-middle fw-medium py-2">
              {isAuth ? 'account' : 'login'}
            </span>
          </Link>

          <div className="container d-flex align-items-center justify-content-end">
            <LangSelect />
          </div>

          {/* {contact_info && contact_info?.socials.length > 0 ? (
            <ul className="social-links list-unstyled d-flex flex-wrap mb-0 mb-5">
              {contact_info?.socials.map((social, index) => (
                <li key={`social-${social.title}-${index}`}>
                  <a href={social.url} className="footer__social-link d-block">
                    
                  </a>
                </li>
              ))}
            </ul>
          ) : null} */}
        </div>
      </nav>
    </div>
  );
};

export default MobileHeader;
