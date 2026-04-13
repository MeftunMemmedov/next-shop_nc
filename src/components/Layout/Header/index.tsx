import { LOGO } from '@/assets/images';
import { LoginIcon, UserIcon } from '@/assets/images/icons';
import { PROJECT_NAME, routes } from '@/constants';
import SearchForm from './components/SearchForm';
import CartModal from '../CartModal';
import { Link } from '@/i18n/routing';
import LangSelect from '../LangSelect';

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

const Header = () => {
  return (
    <header className="header header_sticky container">
      <div className="announcement-bar bg-dark text-light d-flex row">
        <div className="col-11">
          <div className="wrap-announcement-bar">
            <div className="box-sw-announcement-bar">
              {header_top_texts.map((text, index) => (
                <div
                  className="announcement-bar-item"
                  key={`header-top-text-${index}`}
                >
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-1 p-0 d-flex justify-content-center align-items-center">
          <LangSelect />
        </div>
      </div>
      <div className="container">
        <div className="header-desk header-desk_type_1">
          <div className="logo">
            <Link href="/">
              <img
                src={LOGO}
                alt={PROJECT_NAME}
                width={120}
                className="logo__image d-block"
              />
            </Link>
          </div>

          <nav className="navigation">
            <ul className="navigation__list list-unstyled d-flex">
              {routes.slice(0, 4).map((route, index) => (
                <li
                  className="navigation__item"
                  key={`header-navlink-${index}`}
                >
                  <Link href={route.path} className="navigation__link">
                    {route.title}
                  </Link>
                  {route.path === '/products' && (
                    <div className="mega-menu">
                      <div className="container">
                        <div className="row">
                          <div className="col-9">
                            <div className="row">
                              {/* {categories?.results.map((item) => (
                                <div
                                  className="col-xl-3 col-lg-4 col-2 pe-4 mb-3"
                                  key={`category--${item.slug}`}
                                >
                                  <Link
                                    to={`/products?category=${item.slug}`}
                                    className="sub-menu__title text-dark"
                                  >
                                    {item.title}
                                  </Link>

                                  <ul className="sub-menu__list list-unstyled">
                                    {item.children?.map((child) => (
                                      <li
                                        className="sub-menu__item"
                                        key={`childcategory-${child.slug}`}
                                      >
                                        <Link
                                          to={`/products?category=${child.slug}`}
                                          className="menu-link menu-link_us-s"
                                        >
                                          {child.title}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))} */}
                            </div>
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

            <div className="header-tools__item hover-container">
              <Link
                className="header-tools__item"
                href={false ? '/account/details' : '/auth/signin'}
              >
                {false ? <UserIcon /> : <LoginIcon />}
              </Link>
            </div>

            <CartModal />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
