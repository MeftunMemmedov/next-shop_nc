'use client';
import { useState } from 'react';

import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';

import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Slide } from '@/types';

const HeroSlider = ({ slides }: { slides: Slide[] }) => {
  const [showNavigation, setShowNavigation] = useState<boolean>(false);

  const sliderSettings: SwiperProps = {
    modules: [Navigation, Autoplay],
    loop: true,
    navigation: showNavigation,
    autoplay: {
      delay: 5000,
    },
    onResize: () => {
      setShowNavigation(window.innerWidth >= 768);
    },
  };

  if (!slides || slides.length === 0) return null;
  return (
    <section className="home-hero-slider-container swiper-container slideshow type4 slideshow-navigation-white-sm container">
      <Swiper
        wrapperTag="ul"
        wrapperClass="list-unstyled"
        className="hero-slider h-100"
        {...sliderSettings}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            tag="li"
            key={`hero-slide-${index}-${slide.id}`}
            style={{
              opacity: 1,
              transform: 'translate3d(0px, 0px, 0px)',
              transitionDuration: '0ms',
            }}
          >
            <Link
              href={slide.url || '/products'}
              className="overflow-hidden position-relative h-100"
            >
              <div className="slideshow-bg">
                <Image
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                  src={slide.image}
                  width={1920}
                  height={757}
                  alt={`${slide.title} - ${slide.description}`}
                  className="slideshow-bg__img object-fit-cover"
                />
                <div className="slideshow-text container position-absolute start-50 top-50 translate-middle">
                  <h2
                    className={`${slide.title.length > 20 ? 'fs-45' : 'fs-70'} mb-2 mb-lg-3 animate animate_fade animate_btt animate_delay-5 text-uppercase fw-normal text-light`}
                    style={{ fontFamily: '"Average Sans"' }}
                  >
                    {slide.title}
                  </h2>
                  <p className="h6 mb-4 pb-2 animate animate_fade animate_btt animate_delay-5 lh-2rem text-light d-sm-block d-none">
                    {slide.description}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
