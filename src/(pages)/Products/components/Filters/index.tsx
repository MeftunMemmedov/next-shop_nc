'use client';
import { use, useEffect } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { Brand, GlobalContextType } from '@/types';
import * as Filter from './components';

const Filters = ({ brands }: { brands: Brand[] }) => {
  const globalContext = use<GlobalContextType | undefined>(GlobalContext);
  const sidebarVisible = globalContext?.sidebarVisible;
  useEffect(() => {
    if (sidebarVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [sidebarVisible]);

  if (!globalContext) return null;
  const { setSidebarVisible } = globalContext;
  return (
    <div
      className={`shop-sidebar side-sticky bg-body ${sidebarVisible ? 'aside_visible' : ''}`}
    >
      <div className="aside-header d-flex d-lg-none align-items-center">
        <h3 className="text-uppercase fs-6 mb-0">Filters</h3>

        <button
          className="btn-close-lg btn-close-aside ms-auto"
          onClick={() => setSidebarVisible(false)}
        />
      </div>

      <div className="pt-4 pt-lg-0" />

      <Filter.CategoryFilter />
      <Filter.BrandFilter brands={brands} />
      <Filter.PriceFilter />
    </div>
  );
};

export default Filters;
