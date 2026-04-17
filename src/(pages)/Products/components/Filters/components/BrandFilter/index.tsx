'use client';

import { useState } from 'react';

import { ArrowDownIcon } from '@/assets/images/icons';

import { useAppSelector } from '@/store/hooks';
import { useQueryState } from 'nuqs';
import { Brand } from '@/types';

const BrandFilter = ({ brands }: { brands: Brand[] }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { categories } = useAppSelector((store) => store.data);

  const [brandQuery, setBrandQuery] = useQueryState('brand', {
    shallow: false,
    scroll: true,
    history: 'push',
  });
  if (!categories || categories.length === 0) return null;
  return (
    <div className="accordion">
      <div className="accordion-item mb-4 pb-3">
        <h5 className="accordion-header">
          <button
            className={`accordion-button p-0 border-0 fs-5 text-uppercase ${!isVisible ? 'collapsed' : ''}`}
            onClick={() => setIsVisible((prevState) => !prevState)}
          >
            Brand
            <ArrowDownIcon className="accordion-button__icon type2" />
          </button>
        </h5>

        <div
          className={`accordion-collapse filters border-0 ${isVisible ? 'show' : 'hide'}`}
        >
          <div className="accordion-body px-0 pb-0 pt-3">
            <ul className="list list-inline mb-0">
              {brands.map((brand) => (
                <li className="list-item" key={`category-${brand.slug}-filter`}>
                  <a
                    role="button"
                    className={`menu-link py-1 d-flex gap-2  ${brandQuery === brand.slug ? 'fw-bold' : ''}`}
                    onClick={() => {
                      setBrandQuery(brand.slug);
                    }}
                  >
                    {brand.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
