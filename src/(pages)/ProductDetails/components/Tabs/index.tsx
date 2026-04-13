'use client';
import { Product } from '@/types';
import { useState } from 'react';

interface Props {
  product: Product;
}

type Tab = 'description' | 'reviews';
const Tabs = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="product-single__details-tab m-auto" id="tabs">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {product.description && (
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link nav-link_underscore btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => handleTabChange('description')}
              role="tab"
              aria-selected={activeTab === 'description'}
            >
              Description
            </button>
          </li>
        )}
        {/* <li className="nav-item" role="presentation">
              <button
                className={`nav-link nav-link_underscore btn ${activeTab === 'additional-info' ? 'active' : ''}`}
                onClick={() => handleTabChange('additional-info')}
                role="tab"
                aria-selected={activeTab === 'additional-info'}>
                {t('tabs.titles.1')}
              </button>
            </li> */}
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link nav-link_underscore btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => handleTabChange('reviews')}
            role="tab"
            aria-selected={activeTab === 'reviews'}
          >
            Reviews (0)
          </button>
        </li>
      </ul>

      <div className="tab-content">
        {/* Description Tab */}
        <div
          className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`}
        >
          <div
            className="product-single__description"
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>

        {/* Additional Info Tab */}
        {/* <div
              className={`tab-pane fade ${activeTab === 'additional-info' ? 'show active' : ''}`}>
              <div className="product-single__addtional-info">
                <div className="item">
                  <label className="h6">Weight</label>
                  <span>1.25 kg</span>
                </div>
                <div className="item">
                  <label className="h6">Dimensions</label>
                  <span>90 x 60 x 90 cm</span>
                </div>
                <div className="item">
                  <label className="h6">Size</label>
                  <span>XS, S, M, L, XL</span>
                </div>
                <div className="item">
                  <label className="h6">Color</label>
                  <span>Black, Orange, White</span>
                </div>
                <div className="item">
                  <label className="h6">Storage</label>
                  <span>Relaxed fit shirt-style dress with a rugged</span>
                </div>
              </div>
            </div> */}

        {/* Reviews Tab */}
        {/* <div
                className={`tab-pane fade ${activeTab === 'reviews' ? 'show active' : ''}`}
              >
                <ReviewPagination
                  count={currentProductReviews?.count || 0}
                  reviewPage={reviewPage}
                  setReviewPage={setReviewPage}
                />
                <Reviews
                  reviews={currentProductReviews?.results || []}
                  isInAccount={false}
                  mutate={productReviewsMutate}
                />
                <div>
                  {isAuth ? (
                    <ReviewForm
                      product={product.slug}
                      mutate={productReviewsMutate}
                      reviewCount={currentProductReviews?.count}
                    />
                  ) : (
                    <div>
                      <p className="text-center">
                        <Trans
                          components={{
                            tag: (
                              <Link
                                href="/login"
                                className="text-underline text-danger"
                              />
                            ),
                          }}
                        >
                          {`${t('tabs.reviews.login_message.message', { login_title: t('tabs.reviews.login_message.login_title') })} `}
                        </Trans>
                      </p>
                    </div>
                  )}
                </div>
              </div> */}
      </div>
    </div>
  );
};

export default Tabs;
