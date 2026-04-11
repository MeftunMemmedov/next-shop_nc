import {
  HeartActiveIcon,
  HeartIcon,
  RatingIcon,
  RemoveIcon,
} from '@/assets/images/icons';

import { Product } from '@/types';

import { getPriceDisplay } from '@/helpers';
import CartBtn from './components/CartBtn';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface Props {
  product: Product;
  onRemove?: () => void;
}

const ProductCard = ({ product, onRemove }: Props) => {
  const { images, title, category, discount, price, is_new, slug, rating } =
    product;

  return (
    <div className="product-card-wrapper">
      <div className="product-card mb-3 mb-md-4 mb-xxl-5">
        <div className="pc__img-wrapper">
          <Link href={`/products/${slug}`}>
            <Image
              src={images[0].url}
              width={330}
              height={380}
              alt={title}
              loading="lazy"
              className="pc__img"
            />
          </Link>

          <CartBtn product={product} />
        </div>

        {onRemove && (
          <button className="btn-remove-from-wishlist" onClick={onRemove}>
            <RemoveIcon />
          </button>
        )}

        <div className="pc__info position-relative">
          <h3 className="pc__category fs-6">{category.title}</h3>

          <h2 className="pc__title">
            <Link href={`/products/${slug}`}>{title}</Link>
          </h2>

          <div className="product-card__price d-flex flex-xl-row flex-column justify-content-xl-between align-items-xl-center">
            <div>
              {discount > 0 && (
                <span className="money price price-old">
                  {getPriceDisplay(+price)}
                </span>
              )}

              <span
                className={`money price ${discount > 0 ? 'price-sale' : ''}`}
              >
                {getPriceDisplay(product)}
              </span>
            </div>
            <div className="d-flex align-items-center gap-1">
              <RatingIcon width="12" />
              {rating}
            </div>
          </div>

          <button
            className={`pc__btn-wl position-absolute top-0 end-0 bg-transparent border-0 ${false ? 'active' : ''}`}
          >
            {true ? <HeartActiveIcon /> : <HeartIcon />}
          </button>
        </div>

        {discount > 0 && (
          <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
            <div className="pc-labels__right ms-auto">
              <span className="pc-label pc-label_sale d-block text-white d-flex flex-column gap-0">
                - {discount} AZN <br />
                <span style={{ fontSize: 10 }} className="text-center"></span>
              </span>
            </div>
          </div>
        )}

        {is_new && (
          <div className="pc-labels position-absolute top-0 start-0 w-100 d-flex justify-content-between">
            <div className="pc-labels__left">
              <span className="pc-label pc-label_new d-block bg-white">
                NEW
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
