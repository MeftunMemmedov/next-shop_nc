import { getUser } from '@/api/fetch/helpers/auth';
import { getDatalist } from '@/api/fetch/helpers/get';
import { Comment } from '@/types';
import SingleComment from './SingleComment';

const MyReviews = async ({ locale }: { locale: string }) => {
  const user_id = (await getUser())?.user.user_id;

  const userReviews = await getDatalist<Comment>(
    'shop_comments',
    {
      user_id: `eq.${user_id}`,
      select: 'id,comment,product(*),created_at',
    },
    {
      next: {
        tags: ['my-comments'],
      },
    }
  );

  return (
    <div>
      {userReviews.length > 0 ? (
        <ul>
          {userReviews.map((review, index) => (
            <SingleComment
              review={review}
              user_id={user_id}
              key={`comment-${review.id}-${index}`}
              locale={locale}
            />
          ))}
        </ul>
      ) : (
        <div className="py-5 text-center">
          <p className="fs-3">No comment yet</p>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
