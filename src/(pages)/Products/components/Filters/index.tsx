'use client';
import { use, useEffect, useState } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import {
  Brand,
  Category,
  FilterParams,
  FilterType,
  GlobalContextType,
} from '@/types';
import * as Filter from './components';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

interface Props {
  brands: Brand[];
  categories: Category[];
}

const Filters = ({ brands, categories }: Props) => {
  const globalContext = use<GlobalContextType | undefined>(GlobalContext);

  const [queryStates, setQueryStates] = useQueryStates(
    {
      category: parseAsString,
      brand: parseAsString,
      price_gte: parseAsInteger.withDefault(0),
      price_lte: parseAsInteger.withDefault(2000),
      search: parseAsString,
    },
    {
      shallow: false,
      history: 'replace',
    }
  );

  const { category, brand, price_gte, price_lte, search } = queryStates;

  const initialFilters: FilterParams = {
    category,
    brand,
    price_gte,
    price_lte,
    search,
  };

  const [filters, setFilters] = useState<FilterParams>(initialFilters);

  const toggleFilter = (slug: string, queryName: keyof FilterType) => {
    setFilters((prev) => ({
      ...prev,
      [queryName]: prev[queryName] === slug ? null : slug,
    }));
  };

  const applyFilters = async () => {
    await setQueryStates({
      category: filters.category,
      brand: filters.brand,
      price_gte: filters.price_gte,
      price_lte: filters.price_lte,
    });
  };

  const sidebarVisible = globalContext?.sidebarVisible;

  useEffect(() => {
    if (sidebarVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [sidebarVisible]);

  useEffect(() => {
    setFilters({
      category,
      brand,
      price_gte,
      price_lte,
      search,
    });
  }, [category, brand, price_gte, price_lte, search]);

  const resetFilters = () => {
    setFilters({
      category: null,
      brand: null,
      price_gte: undefined,
      price_lte: undefined,
      search: null,
    });

    setQueryStates({
      category: null,
      brand: null,
      price_gte: null,
      price_lte: null,
      search: null,
    });
  };

  useEffect(() => {
    return () => {
      setQueryStates({
        category: null,
        brand: null,
        price_gte: null,
        price_lte: null,
        search: undefined,
      });
    };
  }, []);

  useEffect(() => {
    console.log(queryStates);
  }, [queryStates]);

  if (!globalContext) return null;
  const { setSidebarVisible } = globalContext;

  return (
    <div
      className={`shop-sidebar side-sticky bg-body ${sidebarVisible ? 'aside_visible' : ''}`}>
      <div className="aside-header d-flex d-lg-none align-items-center">
        <h3 className="text-uppercase fs-6 mb-0">Filters</h3>

        <button
          className="btn-close-lg btn-close-aside ms-auto"
          onClick={() => setSidebarVisible(false)}
        />
      </div>

      <div className="pt-4 pt-lg-0" />

      <Filter.CategoryFilter
        categories={categories}
        toggleFilter={toggleFilter}
        categoryFilter={filters.category}
      />
      <Filter.BrandFilter
        brands={brands}
        brandFilter={filters.brand}
        toggleFilter={toggleFilter}
      />
      <Filter.PriceFilter setFilters={setFilters} filters={filters} />

      <div className="py-4 w-100 d-flex flex-lg-row flex-column justify-content-center gap-2">
        <button className="btn btn-primary" onClick={applyFilters}>
          Filter
        </button>

        {(filters.category ||
          filters.brand ||
          filters.search ||
          filters.price_gte! > 0 ||
          filters.price_lte! < 2000 ||
          (filters.price_gte! > 0 && filters.price_lte! <= 2000)) && (
          <button className="btn btn-danger" onClick={resetFilters}>
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
