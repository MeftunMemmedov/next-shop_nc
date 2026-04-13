import { PRODUCTS } from '@/data/product';
import Filters from './components/Filters';
import ProductCard from '@/components/ProductCard';
import ToolBar from './components/ToolBar';

const Products = () => {
  return (
    <main>
      <div className="mb-4 pb-lg-3" />
      <section className="shop-main container d-flex">
        <Filters />
        <div className="shop-list flex-grow-1">
          <div className="d-flex justify-content-between mb-4 pb-md-2">
            <ToolBar />
          </div>

          <div className={`products-grid row row-cols-2 row-cols-md-3`}>
            {PRODUCTS?.map((item) => (
              <ProductCard product={item} key={item.slug} />
            ))}
          </div>

          {/* <Pagination count={products?.count || 0} /> */}
        </div>
      </section>
    </main>
  );
};

export default Products;
