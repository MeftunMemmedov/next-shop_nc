import * as Sections from './sections';
import { Category, Product, Slide } from '@/types';
import { getDatalist } from '@/api/fetch/helpers/get';

const Home = async () => {
  // SLIDES
  const slidesFetch = await getDatalist<Slide>('shop_slides', undefined, {
    next: {
      revalidate: 3600,
    },
  });

  // FEATURED CATEGORIES
  const featuredCategoryParams = {
    select: '*',
    parent_slug: 'is.null',
  };

  const featuredCategoriesFetch = await getDatalist<Category>(
    'shop_categories',
    featuredCategoryParams,
    {
      next: {
        revalidate: 3600,
      },
    }
  );

  // FEATURED PRODUCTS
  const featuredProductParams = {
    select: '*',
    is_featured: 'eq.true',
  };

  const featuredProductsFetch = await getDatalist<Product>(
    'shop_products',
    featuredProductParams,
    {
      next: {
        revalidate: 3600,
      },
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
