import Filters from './components/Filters';
import ProductCard from '@/components/ProductCard';
import ToolBar from './components/ToolBar';
import { Brand, FilterParams, Product } from '@/types';
import { fetchDatalist } from '@/api/fetch/helpers';
import { getCategoryListwChildren } from '@/api/fetch/helpers/category';

interface Props {
  searchParams: Promise<FilterParams>;
}

const Products = async ({ searchParams }: Props) => {
  const brandFetch = await fetchDatalist<Brand>('shop_brands');
  const categoryFetch = await getCategoryListwChildren();

  const [brands, categories] = await Promise.all([brandFetch, categoryFetch]);

  const { category, brand, price_gte, price_lte, order, search } =
    await searchParams;

  const productParams = new URLSearchParams();

  if (category && categories) {
    const currentParent = categories.find((c) => c.slug === category);
    if (currentParent?.children && currentParent.children.length > 0) {
      const childSlugs = currentParent.children.map((c) => c.slug);
      productParams.set('category', `in.(${childSlugs.join(',')})`);
    } else {
      productParams.set('category', `eq.${category}`);
    }
  }

  if (brand) productParams.set('brand', `eq.${brand}`);
  if (order) productParams.set('order', order);
  if (price_lte) productParams.append('price', `lte.${price_lte}`);
  if (price_gte) productParams.append('price', `gte.${price_gte}`);
  if (search) productParams.set('title', `ilike.%${search}%`);

  const productParamsHaskeys = productParams.size > 0;

  const products = await fetchDatalist<Product>(
    'shop_products',
    productParamsHaskeys ? productParams : null,
    { tags: ['products'] }
  );

  return (
    <main>
      <div className="mb-4 pb-lg-3" />
      <section className="shop-main container d-flex">
        <Filters brands={brands} />
        <div className="shop-list flex-grow-1">
          <div className="d-flex justify-content-between mb-4 pb-md-2">
            <ToolBar />
          </div>

          {products.length > 0 ? (
            <div className={`products-grid row row-cols-2 row-cols-md-3`}>
              {products.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="py-5 text-center fs-3 fw-bold">
              <p>No Product Found</p>
            </div>
          )}
          {/* <Pagination count={products?.count || 0} /> */}
        </div>
      </section>
    </main>
  );
};

export default Products;
