import { Comment } from '@/types';
import CommentForm from './components/CommentForm';
import { createFakeImage, formattedDate } from '@/helpers';
import Image from 'next/image';

interface Props {
  comments: Comment[];
  slug: string;
}

const Comments = async ({ comments, slug }: Props) => {
  return (
    <div className="product-single__details-tab m-auto">
      <div className="nav nav-tabs">
        <div className="nav-item">
          <button className="nav-link nav-link_underscore btn">
            Comments ({comments.length})
          </button>
        </div>
      </div>

      <div className="tab-content">
        <div className="tab-pane fade active show">
          <div className="product-single__review-form mb-5">
            <CommentForm slug={slug} />
          </div>
          <div className="product-single__reviews-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <article
                  className="product-single__reviews-item"
                  key={comment.id}>
                  <div className="customer-avatar">
                    <Image
                      src={createFakeImage(10, 10)}
                      loading="lazy"
                      width={30}
                      height={30}
                      alt=""
                    />
                  </div>
                  <div className="customer-review">
                    <div className="d-flex align-items-center gap-2">
                      <h6 className="m-0">{comment.user.user_name}</h6>
                      <span>|</span>
                      <span className="text-secondary">
                        {comment.user.email}
                      </span>
                    </div>

                    <time
                      dateTime={String(comment.created_at)}
                      className="review-date">
                      {formattedDate(comment.created_at)}
                    </time>
                    <div className="review-text">
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                </article>
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
