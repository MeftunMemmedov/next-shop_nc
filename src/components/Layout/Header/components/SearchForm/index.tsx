'use client';
import { SearchIcon } from '@/assets/images/icons';
import Spinner from '@/components/Spinner';
import { blockScreenByTransparentOverlay, getPriceDisplay } from '@/helpers';
import { debounce } from '@/helpers/debounce';
import { Link, useRouter } from '@/i18n/routing';
import { Product } from '@/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SubmitEvent, useEffect, useRef, useState } from 'react';

const SearchForm = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');
  const [results, setResults] = useState<Product[]>([]);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const searchInputValue = searchInput.trim();

  const resetSearch = () => {
    setResults([]);
    setStatus('idle');
  };

  const fetchResults = async (q: string) => {
    if (!q) {
      resetSearch();
      return;
    }
    try {
      setStatus('loading');

      const res = await fetch(`/api/products?search=${q}`);
      const searchResults = await res.json();

      setResults(searchResults);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const debounceRef = useRef(debounce((q: string) => fetchResults(q), 500));

  const handleSearchFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    setIsSearchVisible(false);
    resetSearch();
    router.push(`/products?search=${searchInputValue}`);
  };

  useEffect(() => {
    setIsSearchVisible(false);
    setSearchInput('');
    resetSearch();
  }, [pathname]);

  useEffect(() => {
    blockScreenByTransparentOverlay(isSearchVisible);
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
        className={`header-tools__item hover-container ${isSearchVisible ? 'js-content_visible' : ''}`}>
        <div className="position-relative">
          <button
            className="search-field__actor btn p-0"
            aria-label="open search"
            aria-expanded={isSearchVisible}
            onClick={() => setIsSearchVisible((prevState) => !prevState)}>
            <SearchIcon />
            <i className="btn-icon btn-close-lg"></i>
          </button>
        </div>
      </div>
      <div
        className={`search-popup js-hidden-content ${isSearchVisible ? 'visible' : ''}`}>
        <form
          className="search-field container"
          onSubmit={handleSearchFormSubmit}>
          <label
            htmlFor="search-input"
            className="text-uppercase text-secondary fw-medium mb-4">
            WHAT ARE YOU LOOKIN FOR?
          </label>
          <div className="position-relative">
            <input
              id="search-input"
              type="text"
              placeholder="SEARCH...."
              className="search-field__input search-popup__input w-100 fw-medium"
              autoComplete="off"
              onChange={(e) => {
                const value = e.target.value.trim();
                setSearchInput(value);
                debounceRef.current(value);
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
                <Spinner />
              ) : (
                results.length > 0 && (
                  <ul className="d-flex flex-column gap-3 container">
                    {results.map((result, index) => (
                      <li key={`result-${result.slug}-${index}`}>
                        <Link
                          href={`/products/${result.slug}`}
                          className="row search-result-card">
                          <div className="col-1 p-0 h-100">
                            <Image
                              width={100}
                              height={100}
                              src={result.images[0]}
                              sizes="80px"
                              loading="lazy"
                              alt={result.title}
                              className="h-100 w-100 object-fit-contain"
                            />
                          </div>
                          <div className="col-8 d-flex flex-column">
                            <strong>{result.title}</strong>
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
              {searchInputValue === '' && status === 'idle' && (
                <div className="py-3 text-center">
                  <p>Start typing to search products</p>
                </div>
              )}
              {status === 'success' && results.length === 0 && (
                <div className="py-3 text-center">
                  <p>No result found</p>
                </div>
              )}
              {status === 'error' && (
                <div className="py-3 text-center text-danger">
                  <p>An error occured. Please try again.</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
