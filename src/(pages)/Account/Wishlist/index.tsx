'use client';
import ProductCard from '@/components/ProductCard';
import Spinner from '@/components/Spinner';
import { useWishlist } from '@/hooks';
import { Link } from '@/i18n/routing';

const Wishlist = () => {
  const { items, toggleWishlist } = useWishlist();
  return (
    <div className="page-content my-account__wishlist">
      <div className="products-grid row row-cols-2 row-cols-lg-3">
        {false ? (
          <Spinner size={30} />
        ) : items && items?.length > 0 ? (
          items?.map((item) => (
            <ProductCard
              product={item.product}
              key={`wishlist-item-${item.product.slug}`}
              onRemove={() => {
                toggleWishlist(item.product);
              }}
            />
          ))
        ) : (
          <div className="text-center w-100 py-5">
            <p className="fs-2">Wishlist is empty</p>
            <Link href="/products" className="btn btn-dark">
              Discover Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
