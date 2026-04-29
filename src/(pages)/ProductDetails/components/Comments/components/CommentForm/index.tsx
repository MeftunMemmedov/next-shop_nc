'use client';
import { addCommentAction } from '@/actions/comment';
import { initialActionState } from '@/constants/actionstatus';
import { Link } from '@/i18n/routing';
import { useAppSelector } from '@/store/hooks';
import { useActionState } from 'react';

const CommentForm = ({ slug }: { slug: string }) => {
  const { info: userInfo, isAuth } = useAppSelector(
    (store) => store.inventory.user
  );

  const [state, formAction, isPending] = useActionState(
    addCommentAction,
    initialActionState
  );

  if (!isAuth)
    return (
      <div className="py-3 text-center">
        <p>
          Please{' '}
          <Link href="/auth/signin" className="text-danger" scroll>
            login
          </Link>{' '}
          for adding comment!
        </p>
      </div>
    );
  return (
    <form action={formAction}>
      <input name="user_id" readOnly hidden value={userInfo?.user_id} />
      <input name="product" readOnly hidden value={slug} />
      <div className="mb-4">
        <textarea
          disabled={isPending}
          name="comment"
          className={`form-control form-control_gray ${state?.status === 'failure' ? 'border border-danger' : ''}`}
          placeholder="Your Comment"
          cols={30}
          rows={8}
        />
        {state?.status === 'success' && (
          <div className="rounded bg-success px-3 text-center py-1 mt-2">
            <p>{state.message}</p>
          </div>
        )}
        {state?.status === 'failure' && (
          <div className="rounded bg-danger text-light text-center px-3 py-1 mt-2">
            <p>{state.message}</p>
          </div>
        )}
      </div>

      <div className="form-action">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
