'use client';

import { useState } from 'react';

import { ArrowDownIcon } from '@/assets/images/icons';

import { useAppSelector } from '@/store/hooks';
import { useQueryState } from 'nuqs';

const CategoryFilter = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const { categories } = useAppSelector((store) => store.data);

  const [categoryQuery, setCategoryQuery] = useQueryState('category', {
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
            Category
            <ArrowDownIcon className="accordion-button__icon type2" />
          </button>
        </h5>

        <div
          className={`accordion-collapse filters border-0 ${isVisible ? 'show' : 'hide'}`}
        >
          <div className="accordion-body px-0 pb-0 pt-3">
            <ul className="list list-inline mb-0">
              {categories.map((category) => (
                <li
                  className="list-item"
                  key={`category-${category.slug}-filter`}
                >
                  <a
                    role="button"
                    className={`menu-link py-1 d-flex gap-2  ${categoryQuery === category.slug ? 'fw-bold' : ''}`}
                    onClick={() => {
                      setCategoryQuery(category.slug);
                    }}
                  >
                    {/* <Image
                      src={category.image}
                      loading="lazy"
                      width={20}
                      height={20}
                      alt={category.title}
                    /> */}
                    {category.title}
                  </a>
                  <ul>
                    {category.children?.map((childCat) => (
                      <li
                        className="list-item"
                        key={`category-${childCat.slug}-filter`}
                      >
                        <a
                          role="button"
                          className={`menu-link py-1 d-flex gap-2  ${categoryQuery === childCat.slug ? 'fw-bold' : ''}`}
                          onClick={() => {
                            setCategoryQuery(childCat.slug);
                          }}
                        >
                          {/* <Image
                      src={category.image}
                      loading="lazy"
                      width={20}
                      height={20}
                      alt={category.title}
                    /> */}
                          {childCat.title}
                        </a>
                      </li>
                    ))}
                  </ul>
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
