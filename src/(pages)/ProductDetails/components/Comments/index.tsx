import { createFakeImage } from '@/data/image';
import { Comment } from '@/types';
import CommentForm from './components/CommentForm';
import { getLocale } from 'next-intl/server';
import { formattedDate } from '@/helpers';

interface Props {
  comments: Comment[];
  slug: string;
}

const Comments = async ({ comments, slug }: Props) => {
  const locale = await getLocale();

  return (
    <div className="product-single__details-tab m-auto" id="tabs">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link nav-link_underscore btn">
            Comments ({comments.length})
          </button>
        </li>
      </ul>

      <div className="tab-content">
        <div className="tab-pane fade active show">
          <div className="product-single__review-form mb-5">
            <CommentForm slug={slug} />
          </div>
          <div className="product-single__reviews-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className="product-single__reviews-item" key={comment.id}>
                  <div className="customer-avatar">
                    <img loading="lazy" src={createFakeImage(10, 10)} />
                  </div>
                  <div className="customer-review">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="m-0">{comment.user.user_name}</h6>
                      <span>|</span>
                      <span className="text-secondary">
                        {comment.user.email}
                      </span>
                    </div>

                    <div className="review-date">
                      {formattedDate(comment.created_at, locale)}
                    </div>
                    <div className="review-text">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-2 text-center fs-3">
                <p>No comments yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
