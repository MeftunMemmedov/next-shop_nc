import { LOGO } from '@/assets/images';
import { LoginIcon, UserIcon } from '@/assets/images/icons';
import { PROJECT_NAME, routes } from '@/constants';
import SearchForm from './components/SearchForm';
import { Link } from '@/i18n/routing';
import LangSelect from '../LangSelect';
import { Category, UserAuthState } from '@/types';
import CartModal from '../CartModal';
import Image from 'next/image';

const header_top_texts = [
  'DISCOUNTS ON SAMOVARS – THE MOST DELICIOUS WAY TO BREW TEA',
  'PREMIUM KNIVES – A MUST-HAVE FOR EVERY KITCHEN!',
  'TRADITIONAL TANDOORS – THE SECRET TO FLAVORFUL MEALS',
  "GRILL SEASON IS HERE – DON'T MISS MANAGL DISCOUNTS",
  'AFGHAN POTS ON SALE – ADD FLAVOR TO YOUR COOKING',
  'UZBEK POT – BRING EASTERN TASTE TO YOUR HOME',
  'CHOOSE A SAMOVAR – ENJOY TRADITIONAL TEA WITH DISCOUNT',
  'BIG DISCOUNTS ON KITCHEN KNIVES – LIMITED TIME ONLY!',
  'TANDOOR COOKING MADE EASY – GRAB YOUR DEAL NOW',
  'SMELLS LIKE GRILL – MANAGL SALE IS ON!',
  'AFGHAN POT – YOUR NEW KITCHEN FAVORITE',
  'UZBEK POT – THE SECRET TO AUTHENTIC PILAF',
  'SAMOVARS ARE BACK – ENJOY TRADITION WITH STYLE',
  'PROFESSIONAL KITCHEN KNIVES – SPECIAL OFFERS NOW',
  'LIMITED-TIME TANDOOR DEAL – DON’T MISS OUT!',
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
          <div className="logo">
            <Link href="/" scroll aria-label={`${PROJECT_NAME} home page`}>
              <Image
                src={LOGO}
                alt={PROJECT_NAME ?? ''}
                width={120}
                height={30}
                className="logo__image d-block"
                priority
                fetchPriority="high"
              />
            </Link>
          </div>

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
