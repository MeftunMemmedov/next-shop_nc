'use client';
import { getDataList } from '@/api/axios/helpers';
import { SearchIcon } from '@/assets/images/icons';
import { getPriceDisplay } from '@/helpers';
import { Link, useRouter } from '@/i18n/routing';
import { Product } from '@/types';
import { SubmitEvent, useEffect, useState } from 'react';

const SearchForm = () => {
  const router = useRouter();

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');
  const [debouncedVal, setDebouncedVal] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error' | 'finished'
  >('idle');
  const searchInputValue = searchInput.trim();
  const debouncedValue = searchInput.trim();

  const resetInput = () => {
    setResults([]);
    setStatus('idle');
  };
  const handleSearchFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setIsSearchVisible(false);
    router.push(`/products?search=${searchInputValue}`);
    resetInput();
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedVal(searchInput);
    }, 500);

    return () => clearTimeout(timeOut);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedValue === '') return;
    const getResults = async () => {
      try {
        setStatus('loading');
        const res = await getDataList<Product>('shop_products', {
          title: `ilike.%${debouncedValue}%`,
          limit: 5,
        });
        setResults(res);
        setStatus('success');
      } catch {
        setStatus('error');
      }
    };
    getResults();
  }, [debouncedVal]);

  useEffect(() => {
    if (isSearchVisible) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isSearchVisible]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchVisible(false);
      }
    };

    window.addEventListener('keydown', close);

    return () => {
      window.removeEventListener('keydown', close);
    };
  }, []);
  return (
    <>
      <div
        className={`header-tools__item hover-container ${isSearchVisible ? 'js-content_visible' : ''}`}
      >
        <div className="position-relative">
          <a
            className="search-field__actor"
            role="button"
            onClick={() => setIsSearchVisible((prevState) => !prevState)}
          >
            <SearchIcon />

            <i className="btn-icon btn-close-lg"></i>
          </a>
        </div>
      </div>
      <div
        className={`search-popup js-hidden-content ${isSearchVisible ? 'visible' : ''}`}
      >
        <form
          className="search-field container"
          onSubmit={handleSearchFormSubmit}
        >
          <p className="text-uppercase text-secondary fw-medium mb-4">
            WHAT ARE YOU LOOKIN FOR?
          </p>
          <div className="position-relative">
            <input
              className="search-field__input search-popup__input w-100 fw-medium"
              type="text"
              name="search-keyword"
              placeholder={'SEARCH....'}
              onChange={(e) => {
                const value = e.target.value;
                setSearchInput(value);
                if (value.trim() === '') {
                  resetInput();
                } else {
                  setStatus('loading');
                }
              }}
            />
            <button className="btn-icon search-popup__submit" type="submit">
              <SearchIcon />
            </button>
            <button
              className="btn-icon btn-close-lg search-popup__reset"
              type="reset"
            />
          </div>
          <div className="search-popup__results">
            <div className="sub-menu search-results">
              {status === 'loading' ? (
                <div>Loading...</div>
              ) : (
                results.length > 0 && (
                  <ul className="d-flex flex-column gap-3 container">
                    {results.map((result, index) => (
                      <li key={`result-${result.slug}-${index}`}>
                        <Link
                          href={`/products/${result.slug}`}
                          className="row search-result-card"
                        >
                          <div className="col-1 p-0 h-100">
                            <img
                              src={result.images[0]}
                              className="h-100 w-100"
                              alt={result.title}
                            />
                          </div>
                          <div className="col-8 d-flex flex-column">
                            <h4>{result.title}</h4>
                            <span>{result.category.title}</span>
                          </div>
                          <div className="col-3 d-flex justify-content-center align-items-center">
                            <span>{getPriceDisplay(result.price)}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              )}
              {debouncedVal === '' && status === 'idle' && (
                <div className="py-16 text-center text-gray-400">
                  <p>Start typing to search movies</p>
                </div>
              )}
              {status === 'success' && results.length === 0 && (
                <div className="py-10 text-center text-white">
                  <p>No result found</p>
                </div>
              )}
              {status === 'error' && (
                <div className="py-10 text-center text-red-800">
                  <p>An error occured. Please try again.</p>
                </div>
              )}
            </div>

            <div className="search-result row row-cols-5" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
