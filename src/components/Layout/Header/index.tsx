import { LoginIcon, UserIcon } from '@/assets/images/icons';
import { routes } from '@/constants';
import SearchForm from './components/SearchForm';
import { Link } from '@/i18n/routing';
import LangSelect from '../LangSelect';
import { Category, UserAuthState } from '@/types';
import CartModal from '../CartModal';
import Logo from '../Logo';

const header_top_texts = [
  'DISCOVER GUITARS THAT INSPIRE EVERY NOTE',
  'PREMIUM GUITARS & GEAR – MADE FOR REAL MUSICIANS',
  'TURN UP YOUR SOUND WITH EXCLUSIVE DEALS',
  'FIND YOUR PERFECT TONE – SHOP NOW',
  'PLAY LOUDER, PLAY BETTER – NEW COLLECTION AVAILABLE',
  'LEGENDARY GUITARS FOR EVERY STYLE',
  'UNLOCK YOUR SOUND WITH PROFESSIONAL MUSIC GEAR',
  'LIMITED-TIME DISCOUNTS ON GUITARS & AMPS',
  'FROM CLASSIC ROCK TO MODERN BLUES – WE HAVE IT ALL',
  'ELEVATE YOUR PERFORMANCE WITH PREMIUM INSTRUMENTS',
  'YOUR NEXT GUITAR IS WAITING FOR YOU',
  'CREATE MUSIC WITHOUT LIMITS',
  'HIGH-QUALITY GUITARS, PEDALS & ACCESSORIES',
  'THE PERFECT SOUND STARTS HERE',
  'SHOP THE BEST DEALS FOR MUSICIANS TODAY',
];

interface Props {
  categories: Category[];
  user: UserAuthState | null;
}

const Header = async ({ categories, user }: Props) => {
  return (
    <header className="header header_sticky container">
      <aside
        aria-label="announcements"
        className="announcement-bar bg-dark text-light d-flex row">
        <div className="col-11">
          <div className="wrap-announcement-bar">
            <div className="box-sw-announcement-bar">
              {header_top_texts.map((text, index) => (
                <div
                  className="announcement-bar-item"
                  key={`header-top-text-${index}`}>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-1 p-0 d-flex justify-content-center align-items-center">
          <LangSelect />
        </div>
      </aside>
      <div className="container">
        <div className="header-desk header-desk_type_1">
          <Logo />

          <nav className="navigation">
            <ul className="navigation__list list-unstyled d-flex">
              {routes.slice(0, 4).map((route, index) => (
                <li
                  className="navigation__item"
                  key={`header-navlink-${index}`}>
                  <Link href={route.path} className="navigation__link">
                    {route.title}
                  </Link>
                  {route.path === '/products' && (
                    <div className="mega-menu">
                      <div className="container">
                        <div className="row">
                          <div className="col-9">
                            <ul className="row">
                              {categories?.map((category) => (
                                <li
                                  className="col-xl-3 col-lg-4 col-2 pe-4 mb-3"
                                  key={`category--${category.slug}`}>
                                  <Link
                                    href={`/products?category=${category.slug}`}
                                    className="sub-menu__title text-dark"
                                    prefetch={false}>
                                    {category.title}
                                  </Link>

                                  {category.children &&
                                    category.children.length > 0 && (
                                      <ul
                                        className="sub-menu__list list-unstyled"
                                        aria-label={`${category.title} sub categories`}>
                                        {category.children?.map((child) => (
                                          <li
                                            className="sub-menu__item"
                                            key={`childcategory-${child.slug}`}>
                                            <Link
                                              href={`/products?category=${child.slug}`}
                                              className="menu-link menu-link_us-s"
                                              prefetch={false}>
                                              {child.title}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-tools d-flex align-items-center">
            <SearchForm />

            <nav className="header-tools__item hover-container">
              <Link
                href={user?.isAuth ? '/account/details' : '/auth/signin'}
                className="header-tools__item"
                aria-label={user?.isAuth ? 'account details' : 'sign in'}>
                {user?.isAuth ? <UserIcon /> : <LoginIcon />}
              </Link>
            </nav>

            <CartModal />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
