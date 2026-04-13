'use client';
import { useRef, useState } from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import { NextIcon, PrevIcon } from '@/assets/images/icons';

import ProductCard from '@/components/ProductCard';

import { PRODUCTS } from '@/data/product';

const RelatedProductSlider = () => {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);
  const swiperRef = useRef<SwiperRef | null>(null);

  const swiperSettings: SwiperProps = {
    modules: [Pagination, Navigation],
    loop: true,
    effect: 'none',
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '#related_products .products-pagination',
      type: 'bullets',
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    onAfterInit: (swiper) => {
      setShowNavigation(
        swiper.slides.length > Number(swiper.params.slidesPerView)
      );
    },
    onResize: (swiper) => {
      setShowNavigation(
        swiper.slides.length > Number(swiper.params.slidesPerView)
      );
    },
  };

  const slideTo = (direction: string) => {
    if (swiperRef.current) {
      if (direction === 'next') {
        swiperRef.current.swiper.slideNext();
      } else if (direction === 'prev') {
        swiperRef.current.swiper.slidePrev();
      }
    }
  };

  return (
    <section className="products-carousel container">
      <h2 className="h3 text-uppercase mb-4 pb-xl-2 mb-xl-4">
        Similar Products
      </h2>

      <div id="related_products" className="position-relative">
        <Swiper ref={swiperRef} {...swiperSettings}>
          {PRODUCTS.slice(0, 6).map((item) => (
            <SwiperSlide key={`related-product-slide-${item.slug}`}>
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <>
            <div
              className="products-carousel__prev position-absolute top-50 d-flex align-items-center justify-content-center"
              onClick={() => slideTo('prev')}
            >
              <PrevIcon className="related-product-icon" />
            </div>

            <div
              className="products-carousel__next position-absolute top-50 d-flex align-items-center justify-content-center"
              onClick={() => slideTo('next')}
            >
              <NextIcon className="related-product-icon" />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RelatedProductSlider;
