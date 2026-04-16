'use client';
import { Link } from '@/i18n/routing';
import { Category } from '@/types';
import Image from 'next/image';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

const FeaturedCategorySlider = ({
  featuredCategories,
}: {
  featuredCategories: Category[];
}) => {
  const swiperSettings: SwiperProps = {
    freeMode: true,
    modules: [FreeMode, Autoplay],
    className: 'featured-category-slider',
    autoplay: {
      delay: 4500,
    },
    loop: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 14,
      },
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      425: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  };

  if (!featuredCategories || featuredCategories.length === 0) return null;
  return (
    <section>
      <div className="category-carousel container">
        <h2 className="section-title text-uppercase fs-25 fw-medium text-center mb-4">
          Featured Categories
        </h2>
        <div className="position-relative">
          <div className="swiper-container">
            <Swiper
              wrapperTag="ul"
              wrapperClass="list-unstyled"
              {...swiperSettings}
            >
              {featuredCategories.map((category, index) => (
                <SwiperSlide tag="li" key={`featured-category-slide-${index}`}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="shop-categories__item mb-3 d-flex flex-column align-items-center"
                  >
                    <div className="shop-categories__item-img-box rounded-circle">
                      <Image
                        loading="lazy"
                        src={category.image}
                        width={80}
                        height={80}
                        alt={category.title}
                        className="shop-categories__item-img"
                      />
                    </div>
                    <h6 className="pt-1 mt-3 mt-xl-4 mb-0 text-center">
                      {category.title}
                    </h6>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategorySlider;
