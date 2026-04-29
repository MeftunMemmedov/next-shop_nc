import { LOGO } from '@/assets/images';
import { PROJECT_NAME, routes } from '@/constants';
import { CONTACT_INFORMATION } from '@/data/contact';
import { Link } from '@/i18n/routing';
import { Category } from '@/types';

const Footer = ({ categories }: { categories: Category[] }) => {
  const noFeaturedCategories = categories.filter(
    (category) => !category.is_featured
  );
  return (
    <footer className="footer footer_type_1">
      <div className="footer-middle container">
        <div className="row row-cols-lg-5 row-cols-1">
          <div className="footer-column footer-store-info col-12 mb-4 mb-lg-0">
            <div className="logo">
              <Link href="/">
                <img
                  src={LOGO}
                  className="logo__image d-block"
                  alt={PROJECT_NAME}
                />
              </Link>
            </div>

            <div className="d-flex flex-column gap-2 mb-4">
              {CONTACT_INFORMATION?.address && (
                <p className="footer-address">{CONTACT_INFORMATION?.address}</p>
              )}

              {CONTACT_INFORMATION?.email && (
                <a href={`mailto:${CONTACT_INFORMATION.email}`} className="m-0">
                  <strong className="fw-medium">
                    {CONTACT_INFORMATION?.email}
                  </strong>
                </a>
              )}

              {CONTACT_INFORMATION?.phone && (
                <a href={`tel:${CONTACT_INFORMATION.phone}`}>
                  <strong className="fw-medium">
                    {CONTACT_INFORMATION?.phone}
                  </strong>
                </a>
              )}
            </div>

            {CONTACT_INFORMATION && CONTACT_INFORMATION?.socials.length > 0 ? (
              <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
                {CONTACT_INFORMATION?.socials.map((social, index) => (
                  <li key={`social-${index}-${social.title}`}>
                    <a
                      href={social.url}
                      target="_blank"
                      className="footer__social-link d-block"
                    >
                      <img
                        loading="lazy"
                        src={social.icon}
                        width={32}
                        alt={social.title}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="footer-column footer-menu mb-4 mb-lg-0">
            <h6 className="sub-menu__title text-uppercase">Links</h6>

            <ul className="sub-menu__list list-unstyled">
              {routes.slice(2, 5).map((item, index) => (
                <li className="sub-menu__item" key={`footermenu-item-${index}`}>
                  <Link href={item.path} className="menu-link menu-link_us-s">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {noFeaturedCategories.length > 0 && (
            <div className="footer-column footer-menu mb-4 mb-lg-0">
              <h6 className="sub-menu__title text-uppercase">Categories</h6>

              <ul className="sub-menu__list list-unstyled">
                {noFeaturedCategories.slice(0, 5).map((category) => {
                  return (
                    <li
                      className="sub-menu__item"
                      key={`footer-category-${category.slug}`}
                    >
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="menu-link menu-link_us-s"
                      >
                        {category.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom container">
        <div className="d-block d-md-flex align-items-center justify-content-between">
          <p className="footer-copyright m-0">
            © {new Date().getFullYear()} <a role="none">SHOP NEXT</a>{' '}
          </p>
          <p className="m-0">
            Developed by{' '}
            <a href="" className="developed-by">
              MFTN
            </a>
          </p>
          <div className="footer-settings d-block d-md-flex align-items-center">
            <div className="d-flex align-items-center">
              {/* <label className="me-2 text-secondary">LANG</label>
              <select className="form-select form-select-sm bg-transparent">
                {languages.map((lang) => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    className="footer-select__option"
                  >
                    {lang.name}
                  </option>
                ))}
              </select> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
