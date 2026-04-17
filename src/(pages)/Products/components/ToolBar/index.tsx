'use client';
import { FilterIcon } from '@/assets/images/icons';
import { GlobalContext } from '@/context/GlobalContext';
import { GlobalContextType } from '@/types';
import { useQueryState } from 'nuqs';
import { use } from 'react';

const ToolBar = () => {
  const globalContext = use<GlobalContextType | undefined>(GlobalContext);

  const [orderQuery, setOrderQuery] = useQueryState('order', {
    shallow: false,
  });

  if (!globalContext) return null;

  const { sidebarVisible, setSidebarVisible } = globalContext;
  const sortOptions = [
    {
      label: 'Default',
      value: '',
    },
    {
      label: 'Alphabetically A-Z',
      value: 'title.asc',
    },
    {
      label: 'Alphabetically Z-A',
      value: 'title.desc',
    },
    {
      label: 'Price: Low to High',
      value: 'price.asc',
    },
    {
      label: 'Price: High to Low',
      value: 'price.desc',
    },
  ];

  return (
    <>
      <div className="shop-acs d-flex align-items-center justify-content-between justify-content-md-end flex-grow-1">
        <select
          className="shop-acs__select form-select w-auto border-0 p-1 pe-4 order-1 order-md-0"
          value={orderQuery || ''}
          onChange={(e) => setOrderQuery(e.target.value || null)}
        >
          {sortOptions.map((option) => (
            <option key={`sort-option-${option.label}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="shop-filter d-flex align-items-center order-0 order-md-3 d-lg-none">
          <button
            className="btn-link btn-link_f d-flex align-items-center ps-0 "
            onClick={() => setSidebarVisible(!sidebarVisible)}
          >
            <FilterIcon className="mx-1" />

            <span className="text-uppercase fw-medium d-inline-block align-middle">
              Filters
            </span>
          </button>
        </div>
      </div>

      <div
        className={`page-overlay ${sidebarVisible ? 'page-overlay_visible' : ''}`}
        onClick={() => setSidebarVisible(!sidebarVisible)}
      ></div>
    </>
  );
};

export default ToolBar;
