import * as Sections from './sections';

const Home = () => {
  return (
    <main>
      <Sections.HeroSlider />
      <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
      <Sections.FeaturedCategorySlider />
      <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
      <Sections.FeaturedProductSlider />
      <div className="mb-3 mb-xl-5 pb-3 pt-1 pb-xl-5"></div>
    </main>
  );
};

export default Home;
