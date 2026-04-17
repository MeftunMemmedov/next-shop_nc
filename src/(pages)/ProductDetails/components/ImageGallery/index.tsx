'use client';
import { useRef, useState } from 'react';

import { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import Lightbox from 'yet-another-react-lightbox';
import { ZoomRef } from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

import { NextIcon, PrevIcon } from '@/assets/images/icons';

import { Product } from '@/types';

interface Props {
  product: Product;
}

const ImageGallery = ({ product }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const mainSliderSettings: SwiperProps = {
    modules: [FreeMode, Navigation, Thumbs],
    direction: 'horizontal',
    mousewheel: false,
    slidesPerView: 1,
    spaceBetween: 32,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
    },
  };

  const thumbSliderSettings: SwiperProps = {
    modules: [FreeMode, Navigation, Thumbs],
    direction: 'vertical',
    freeMode: true,
    onSwiper: setThumbsSwiper,
    slidesPerView: 6,
    spaceBetween: 0,
    watchSlidesProgress: true,
    breakpoints: {
      992: {
        direction: 'vertical',
      },
      425: {
        slidesPerView: 5,
        direction: 'horizontal',
      },
      0: {
        direction: 'horizontal',
        slidesPerView: 4,
      },
    },
  };

  const [open, setOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const zoomRef = useRef<ZoomRef>(null);

  const openLightbox = (index: number) => {
    setSlideIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="product-single__media vertical-thumbnail">
        <div className="product-single__image vertical-dot">
          <Swiper {...mainSliderSettings} className="h-100">
            {product.images.map((img, index) => (
              <SwiperSlide
                key={`product-${product.slug}-${index}`}
                className="product-single__image-item h-100"
              >
                <img
                  className="product-image"
                  style={{ cursor: 'pointer', objectFit: 'contain' }}
                  src={img}
                  alt={product.title}
                  loading="lazy"
                  onClick={() => openLightbox(index)}
                />
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev">
              <PrevIcon className="iconSlider" />
            </div>

            <div className="swiper-button-next">
              <NextIcon className="iconSlider" />
            </div>
          </Swiper>
        </div>

        {product.images.length > 1 ? (
          <div className="product-single__thumbnail">
            <Swiper {...thumbSliderSettings}>
              {product.images.map((img, index) => (
                <SwiperSlide
                  key={`product-thumb-${product.slug}-${index}`}
                  className="product-single__image-item"
                >
                  <img src={img} alt={product.title} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : null}
      </div>

      <Lightbox
        plugins={[Zoom]}
        className="light-carousel"
        open={open}
        index={slideIndex}
        close={() => setOpen(false)}
        slides={product.images.map((item) => ({ src: item }))}
        controller={{ closeOnBackdropClick: true }}
        zoom={{
          ref: zoomRef,
          maxZoomPixelRatio: 300,
        }}
      />
    </>
  );
};

export default ImageGallery;
