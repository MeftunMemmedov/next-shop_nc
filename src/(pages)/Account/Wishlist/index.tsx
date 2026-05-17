'use client';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/hooks';
import { Link } from '@/i18n/routing';

const Wishlist = () => {
  const { items, count, toggleWishlist } = useWishlist();
  return (
    <div className="page-content my-account__wishlist">
      <div className="products-grid row row-cols-2 row-cols-lg-3">
        {count === 0 ? (
          <div className="text-center w-100 py-5">
            <p className="fs-2">Wishlist is empty</p>
            <Link href="/products" className="btn btn-dark">
              Discover Products
            </Link>
          </div>
        ) : (
          items?.map((item) => (
            <ProductCard
              key={`wishlist-item-${item.product.slug}`}
              product={item.product}
              onRemove={() => {
                toggleWishlist(item.product);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;
