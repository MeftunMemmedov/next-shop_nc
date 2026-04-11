'use client';
import { LOGO } from '@/assets/images';
import {
  LoginIcon,
  MenuIcon,
  NextIcon,
  PrevIcon,
  SearchIcon,
  UserIcon,
} from '@/assets/images/icons';
import { PROJECT_NAME, routes } from '@/constants';
import { CATEGORIES } from '@/data/category';
import { Fragment, SubmitEvent, useEffect, useState } from 'react';
import { CONTACT_INFORMATION } from '@/data/contact';
import CartModal from '../CartModal';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import LangSelect from '../LangSelect';
import Image from 'next/image';
import { Category } from '@/types';

const MobileHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
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
    router.push(`/products?search=${searchInput}&page=1`);
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

  return (
    <div
      className="header-mobile header_sticky position-absolute"
      style={{ paddingRight: menu ? '0px' : '' }}
    >
      <div className="container d-flex align-items-center h-100">
        <a
          className="mobile-nav-activator d-block position-relative"
          role="button"
          onClick={() => setMenu(!menu)}
        >
          <Image src={MenuIcon} width={20} height={20} alt="menu" />
          <span className="btn-close-lg position-absolute top-0 start-0 w-100"></span>
        </a>

        <div className="logo">
          <Link href="/">
            <img
              src={LOGO}
              alt={PROJECT_NAME}
              className="logo__image d-block"
            />
          </Link>
        </div>

        <CartModal />
      </div>

      <nav className="header-mobile__navigation navigation d-flex flex-column w-100 position-absolute top-100 bg-body overflow-auto">
        <div className="container">
          <form
            className="search-field position-relative mt-4 mb-3"
            onSubmit={handleSearchFormSubmit}
          >
            <div className="position-relative">
              <input
                className="search-field__input w-100 border rounded-1"
                type="text"
                name="search-keyword"
                placeholder={'What are you looking for?'}
                onChange={(e) => setSearchInput(e.target.value)}
              />

              <button
                className="btn-icon search-popup__submit pb-0 me-2"
                type="submit"
              >
                <Image
                  src={SearchIcon}
                  width={20}
                  height={20}
                  className="ms-auto"
                  alt="search icon"
                />
              </button>

              <button
                className="btn-icon btn-close-lg search-popup__reset pb-0 me-2"
                type="reset"
              ></button>
            </div>

            <div className="position-absolute start-0 top-100 m-0 w-100">
              <div className="search-result"></div>
            </div>
          </form>
        </div>

        <div className="container">
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
              }}
            >
              {routes.map((route, index) => (
                <li
                  className="navigation__item"
                  key={`mobile-navlink-${index}`}
                >
                  <div
                    className={`${route.path === '/products' ? 'd-flex justify-content-between' : ''}`}
                  >
                    <Link href={route.path} className="navigation__link">
                      {route.title}
                    </Link>
                    {route.path === '/products' &&
                      !pathname.endsWith('/products') && (
                        <Image
                          src={NextIcon}
                          width={20}
                          height={20}
                          className="ms-auto"
                          alt="next icon"
                          onClick={() => toggleMenu(2)}
                        />
                      )}
                  </div>
                  {route.path === '/products' &&
                    !pathname.endsWith('/products') && (
                      <div
                        className={`sub-menu position-absolute top-0 start-100 w-100 ${isActive(2) ? '' : 'd-none'}`}
                      >
                        <a
                          role="button"
                          onClick={() => toggleMenu(2)}
                          className="navigation__link d-flex align-items-center border-bottom mb-3"
                        >
                          <Image
                            src={PrevIcon}
                            width={20}
                            height={20}
                            className="me-2"
                            alt="prev icon"
                          />
                          Routes.1.title
                        </a>

                        <div className="sub-menu__wrapper">
                          {CATEGORIES?.map((item, index1) => (
                            <Fragment key={index1}>
                              <div className="navigation__link d-flex align-items-center">
                                <Link
                                  href={`/products?category=${item.slug}`}
                                  onClick={() => setMenu(false)}
                                >
                                  {item.title}
                                </Link>
                                {item.children?.length && (
                                  <Image
                                    src={NextIcon}
                                    width={20}
                                    height={20}
                                    className="ms-auto"
                                    alt="next icon"
                                    onClick={() => toggleMenu(2, index1)}
                                  />
                                )}
                              </div>

                              {item.children && (
                                <div
                                  className={`sub-menu__wrapper position-absolute top-0 start-100 w-100 ${isActive(2, index1) ? '' : 'd-none'}`}
                                >
                                  <a
                                    role="button"
                                    className="navigation__link d-flex align-items-center border-bottom mb-2"
                                    onClick={() => toggleMenu(2)}
                                  >
                                    <Image
                                      src={PrevIcon}
                                      width={20}
                                      height={20}
                                      className="me-2"
                                      alt="prev icon"
                                    />
                                    {item.title}
                                  </a>

                                  <ul className="sub-menu__list list-unstyled">
                                    {item.children.map((child: Category) => (
                                      <li
                                        className="sub-menu__item"
                                        key={`childcategory--${child.slug}`}
                                      >
                                        <Link
                                          href={`/products?category=${child.slug}`}
                                          onClick={() => setMenu(false)}
                                          className="menu-link menu-link_us-s"
                                        >
                                          {child.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-top mt-auto pb-5">
          <Link
            href={true ? '/account/details' : '/login'}
            className="customer-links container mt-4 mb-2 pb-1"
          >
            <Image
              src={true ? UserIcon : LoginIcon}
              className="d-inline-block align-middle"
              width={20}
              height={20}
              alt="auth icon"
            />

            <span className="d-inline-block ms-2 text-uppercase align-middle fw-medium py-2">
              {true ? 'account' : 'login'}
            </span>
          </Link>

          <div className="container d-flex align-items-center">
            <LangSelect />
          </div>

          {CONTACT_INFORMATION && CONTACT_INFORMATION?.socials.length > 0 ? (
            <ul className="social-links list-unstyled d-flex flex-wrap mb-0 mb-5">
              {CONTACT_INFORMATION?.socials.map((social, index) => (
                <li key={`social-${social.title}-${index}`}>
                  <a href={social.url} className="footer__social-link d-block">
                    <img
                      loading="lazy"
                      src={social.icon}
                      width={32}
                      alt={`${social.title} icon`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default MobileHeader;
