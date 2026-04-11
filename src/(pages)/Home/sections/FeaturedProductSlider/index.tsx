'use client';
import { useRef, useState } from 'react';

import { Autoplay, FreeMode, Navigation } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

import { NextIcon, PrevIcon } from '@/assets/images/icons';

import { PRODUCTS } from '@/data/product';
import ProductCard from '@/components/ProductCard';

const FeaturedProductSlider = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  const swiperSettings: SwiperProps = {
    autoplay: {
      delay: 4000,
    },
    freeMode: true,
    modules: [FreeMode, Navigation, Autoplay],

    loop: true,
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

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="products-carousel container home-product-slider">
      <h2 className="section-title text-uppercase fs-25 fw-medium text-center mb-4">
        Featured Products
      </h2>
      <div className="position-relative">
        {showNavigation && (
          <div className="swiper-nav-btns position-absolute w-100 h-100 d-flex justify-content-between align-items-center">
            <div
              className="swiper-nav-btn swiper-slide-prev-btn border rounded-circle d-flex justify-content-center align-items-center shadow"
              onClick={slidePrev}
            >
              <PrevIcon />
            </div>
            <div
              className="swiper-nav-btn swiper-slide-next-btn border rounded-circle d-flex justify-content-center align-items-center shadow"
              onClick={slideNext}
            >
              <NextIcon />
            </div>
          </div>
        )}
        <div className="swiper-container">
          <Swiper
            className="home-featured-product-slider"
            ref={swiperRef}
            {...swiperSettings}
          >
            {PRODUCTS.map((product, index) => (
              <SwiperSlide key={`featured-product-slide-${index}`}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSlider;
