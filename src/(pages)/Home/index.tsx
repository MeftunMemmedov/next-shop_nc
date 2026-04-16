import { fetchDatalist } from '@/api/fetch/helpers';
import * as Sections from './sections';
import { Category, Product, Slide } from '@/types';

const Home = async () => {
  // SLIDES
  const slides = await fetchDatalist<Slide>('shop_slides');

  // FEATURED CATEGORIES
  const featuredCategoryParams = new URLSearchParams({
    select: '*',
    parent_id: 'is.null',
  });

  const featuredCategories = await fetchDatalist<Category>(
    'shop_categories',
    featuredCategoryParams
  );

  // FEATURED PRODUCTS
  const featuredProductParams = new URLSearchParams({
    select: '*',
    is_featured: 'eq.true',
  });

  const featuredProducts = await fetchDatalist<Product>(
    'shop_products',
    featuredProductParams
  );
  return (
    <main>
      <Sections.HeroSlider slides={slides} />
      <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
      <Sections.FeaturedCategorySlider
        featuredCategories={featuredCategories}
      />
      <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
      <Sections.FeaturedProductSlider featuredProducts={featuredProducts} />
      <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
    </main>
  );
};

export default Home;
