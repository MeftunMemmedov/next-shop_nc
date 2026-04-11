'use client';
import { SearchIcon } from '@/assets/images/icons';
import { useRouter } from '@/i18n/routing';
import { SubmitEvent, useEffect, useState } from 'react';

const SearchForm = () => {
  const router = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    router.push(`/products?search=${searchInput}&page=1`);
  };

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
            WTF ARE YOU LOOKIN FOR?
          </p>
          <div className="position-relative">
            <input
              className="search-field__input search-popup__input w-100 fw-medium"
              type="text"
              name="search-keyword"
              placeholder={'WTF are u lookin for bro'}
              onChange={(e) => setSearchInput(e.target.value)}
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
            {/* <div className="sub-menu search-results">
              {false ? (
                <div>Loading...</div>
              ) : (
                <ul className="d-flex flex-column gap-3 container">
                  {searchResults?.results.map((result, index) => (
                    <li key={`result-${result.slug}-${index}`}>
                      <Link
                        href={`/products/${result.slug}`}
                        className="row search-result-card"
                      >
                        <div className="col-1 p-0 h-100">
                          <img
                            src={result.images[0].url}
                            className="h-100 w-100"
                            alt={result.title}
                          />
                        </div>
                        <div className="col-8 d-flex flex-column">
                          <h4>{result.title}</h4>
                          <span>{result.category.title}</span>
                        </div>
                        <div className="col-3 d-flex justify-content-center align-items-center">
                          <span>{getPriceDisplay(+result.price)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {false && (
                <div>
                  <p className="text-center fs-4">Results not found</p>
                </div>
              )}
            </div> */}

            <div className="search-result row row-cols-5" />
          </div>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
