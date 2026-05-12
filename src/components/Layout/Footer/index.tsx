import { routes } from '@/constants';
import { Link } from '@/i18n/routing';
import { Category, Config } from '@/types';
import Logo from '../Logo';

interface Props {
  categories: Category[];
  config: Config;
}

const Footer = ({ categories, config }: Props) => {
  const noFeaturedCategories = categories.filter(
    (category) => !category.is_featured
  );

  const { contact_info } = config;
  return (
    <footer className="footer footer_type_1">
      <div className="footer-middle container">
        <div className="row row-cols-lg-5 row-cols-1">
          <div className="footer-column footer-store-info col-12 mb-4 mb-lg-0">
            <Logo />

            <div className="d-flex flex-column gap-2 mb-4">
              {contact_info?.address && (
                <p className="footer-address">{contact_info?.address}</p>
              )}

              {contact_info?.email && (
                <a href={`mailto:${contact_info.email}`} className="m-0">
                  <strong className="fw-medium">{contact_info?.email}</strong>
                </a>
              )}

              {contact_info?.phone && (
                <a href={`tel:${contact_info.phone}`}>
                  <strong className="fw-medium">{contact_info?.phone}</strong>
                </a>
              )}
            </div>

            {/* {contact_info && contact_info?.socials.length > 0 ? (
              <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
                {contact_info?.socials.map((social, index) => (
                  <li key={`social-${index}-${social.title}`}>
                    <a
                      href={social.url}
                      target="_blank"
                      className="footer__social-link d-block">
                      <Image
                        loading="lazy"
                        src={social.icon}
                        width={32}
                        height={32}
                        alt={social.title}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null} */}
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
                      key={`footer-category-${category.slug}`}>
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="menu-link menu-link_us-s">
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
