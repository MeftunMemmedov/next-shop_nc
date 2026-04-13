'use client';

import { useState } from 'react';

import { ArrowDownIcon } from '@/assets/images/icons';

import { CATEGORIES } from '@/data/category';

const CategoryFilter = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  if (!CATEGORIES || CATEGORIES.length === 0) return null;
  return (
    <div className="accordion">
      <div className="accordion-item mb-4 pb-3">
        <h5 className="accordion-header">
          <button
            className={`accordion-button p-0 border-0 fs-5 text-uppercase ${!isVisible ? 'collapsed' : ''}`}
            onClick={() => setIsVisible((prevState) => !prevState)}
          >
            Category
            <ArrowDownIcon className="accordion-button__icon type2" />
          </button>
        </h5>

        <div
          className={`accordion-collapse filters border-0 ${isVisible ? 'show' : 'hide'}`}
        >
          <div className="accordion-body px-0 pb-0 pt-3">
            <ul className="list list-inline mb-0">
              {CATEGORIES.map((category) => (
                <li
                  className="list-item"
                  key={`category-${category.slug}-filter`}
                >
                  {/* ${categoryQuery === category.slug ? 'fw-medium' : ''} */}
                  <a role="button" className={`menu-link py-1 d-flex gap-2`}>
                    {/* <Image
                      src={category.image}
                      loading="lazy"
                      width={20}
                      height={20}
                      alt={category.title}
                    /> */}
                    {category.title}
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

export default CategoryFilter;
