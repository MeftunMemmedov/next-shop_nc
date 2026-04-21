import { fetchData } from '@/api/fetch/helpers';
import * as Sections from './sections';
import { Category, Product, Slide } from '@/types';

const Home = async () => {
  // SLIDES
  const slidesFetch = await fetchData<Slide[]>('shop_slides', undefined, {
    next: {
      revalidate: 3600,
    },
  });

  // FEATURED CATEGORIES
  const featuredCategoryParams = {
    select: '*',
    parent_slug: 'is.null',
  };

  const featuredCategoriesFetch = await fetchData<Category[]>(
    'shop_categories',
    featuredCategoryParams,
    {
      cache: 'force-cache',
    }
  );

  // FEATURED PRODUCTS
  const featuredProductParams = {
    select: '*',
    is_featured: 'eq.true',
  };

  const featuredProductsFetch = await fetchData<Product[]>(
    'shop_products',
    featuredProductParams,
    {
      cache: 'force-cache',
    }
  );

  const [slides, featuredCategories, featuredProducts] = await Promise.all([
    slidesFetch,
    featuredCategoriesFetch,
    featuredProductsFetch,
  ]);
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
