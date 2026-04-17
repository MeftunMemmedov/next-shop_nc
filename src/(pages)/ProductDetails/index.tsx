import { Link } from '@/i18n/routing';
import { Product } from '@/types';
import ImageGallery from './components/ImageGallery';
import { getPriceDisplay } from '@/helpers';
import CartForm from './components/CartForm';
import ShareModal from './components/ShareModal';
import Tabs from './components/Tabs';
import RelatedProductSlider from './components/RelatedProductSlider';
import WishlistBtn from '@/components/WishlistBtn';
import { notFound } from 'next/navigation';
import { fetchDatadetails } from '@/api/fetch/helpers';

const ProductDetails = async ({ slug }: { slug: string }) => {
  const product = await fetchDatadetails<Product>(
    'shop_products',
    `slug=eq.${slug}`
  );

  if (!product) notFound();
  return (
    <main>
      <div className="mb-md-1 pb-md-3"></div>
      <section className="product-single container">
        <div>
          <div className="d-lg-none d-flex justify-content-between align-items-center mb-4 pb-md-2">
            <div className="breadcrumb mb-0 flex-grow-1">
              <Link
                href="/"
                className="menu-link menu-link_us-s text-uppercase fw-medium"
              >
                Home
              </Link>

              <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
                /
              </span>

              <Link
                href="/products"
                className="menu-link menu-link_us-s text-uppercase fw-medium"
              >
                Products
              </Link>

              <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
                /
              </span>

              <a
                role="none"
                className="menu-link menu-link_us-s text-uppercase fw-medium"
              >
                {product.title}
              </a>
            </div>
            {product.is_new && (
              <div
                className="bg-danger d-inline-block px-2 py-0 d-flex justify-content-center align-items-center d-inline"
                style={{ height: 30 }}
              >
                New
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <ImageGallery product={product} />
          </div>
          <div className="col-lg-5">
            <div className="d-lg-flex d-none justify-content-between mb-4 pb-md-2">
              <div className="breadcrumb mb-0 d-none d-md-block flex-grow-1">
                <Link
                  href="/"
                  className="menu-link menu-link_us-s text-uppercase fw-medium"
                >
                  Home
                </Link>

                <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
                  /
                </span>

                <Link
                  href="/products"
                  className="menu-link menu-link_us-s text-uppercase fw-medium"
                >
                  Products
                </Link>

                <span className="breadcrumb-separator menu-link fw-medium ps-1 pe-1">
                  /
                </span>

                <a
                  role="none"
                  className=" menu-link_us-s text-uppercase fw-medium"
                >
                  {product.title}
                </a>
              </div>
              {product.is_new && (
                <div
                  className="bg-danger d-inline-block px-2 py-0 d-flex justify-content-center align-items-center d-inline"
                  style={{ height: 30 }}
                >
                  New
                </div>
              )}
            </div>
            <h1 className="product-single__name">{product.title} </h1>
            <div className="position-relative">
              <WishlistBtn product={product} />
            </div>
            <div className="product-single__price">
              {product.discount > 0 && (
                <strong className="price-old current-price fw-normal">
                  {getPriceDisplay(+product.price)}
                </strong>
              )}

              <span
                className={` current-price ${product.discount > 0 ? 'price-sale' : ''}`}
              >
                {getPriceDisplay(product)}
              </span>
            </div>
            {/* {product.discount > 0 && product.discount_end_date && (
              <DiscountTimer discountEnd={product.discount_end_date} />
            )} */}

            <CartForm product={product} />

            <div className="product-single__addtolinks mt-3">
              <ShareModal />
            </div>
            <div>
              {/* <ul>
                <li>Category :{product.category.title}</li>
                <li>
                  Delivery :{' '}
                  <span className="text-secondary">
                    {product.has_delivery ? 'Yeah' : 'Nope'}
                  </span>
                </li>
              </ul> */}
            </div>
            {/* <div className="product-single__swatches">
              <div className="product-swatch text-swatches">
                <label>Category :</label>
                <div className="swatch-list">
                  {categories.map((category, index) => (
                    <>
                      <span key={index} className="text-secondary">
                        {category}
                      </span>
                      {index < categories.length - 1 && (
                        <span className="text-secondary">/</span>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <Tabs product={product} />
      </section>
      <RelatedProductSlider />
    </main>
  );
};

export default ProductDetails;
