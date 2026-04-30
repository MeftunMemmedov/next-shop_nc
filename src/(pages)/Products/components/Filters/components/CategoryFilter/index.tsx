'use client';

import { useEffect, useState } from 'react';

import { ArrowDownIcon, CategoryIcon } from '@/assets/images/icons';

import { useQueryState } from 'nuqs';
import { useSearchParams } from 'next/navigation';
import { Category } from '@/types';
import Image from 'next/image';

interface Props {
  categories: Category[];
}

const CategoryFilter = ({ categories }: Props) => {
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState<boolean>(true);

  const [categoryQuery, setCategoryQuery] = useQueryState('category', {
    shallow: false,
    history: 'replace',
  });

  const categorySearchParam = searchParams.get('category');
  const isCategoryFiterActive = (category: Category) =>
    categoryQuery === category.slug && categorySearchParam === category.slug;

  const toggleCategoryFilter = (category: Category) => {
    if (categoryQuery === category.slug) {
      setCategoryQuery(null);
    } else {
      setCategoryQuery(category.slug);
    }
  };

  useEffect(() => {
    if (categorySearchParam) {
      setCategoryQuery(categorySearchParam);
    } else {
      setCategoryQuery(null);
    }
  }, []);
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
                    className={`menu-link py-1 d-flex gap-2  ${isCategoryFiterActive(category) ? 'fw-bold' : ''}`}
                    onClick={() => toggleCategoryFilter(category)}
                  >
                    {category.image ? (
                      <Image
                        src={category.image}
                        loading="lazy"
                        width={20}
                        height={20}
                        alt={category.title}
                      />
                    ) : (
                      <CategoryIcon width="20" height="20" />
                    )}
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
                          className={`menu-link py-1 d-flex gap-2  ${isCategoryFiterActive(childCat) ? 'fw-bold' : ''}`}
                          onClick={() => toggleCategoryFilter(childCat)}
                        >
                          {childCat.image ? (
                            <Image
                              src={childCat.image}
                              loading="lazy"
                              width={20}
                              height={20}
                              alt={childCat.title}
                            />
                          ) : (
                            <CategoryIcon width="20" height="20" />
                          )}
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
