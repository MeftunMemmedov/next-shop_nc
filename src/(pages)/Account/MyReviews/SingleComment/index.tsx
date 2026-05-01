'use client';
import { deleteCommentAction, editCommentAction } from '@/actions/comment';
import { formattedDate, getPriceDisplay } from '@/helpers';
import { Comment } from '@/types';
import Image from 'next/image';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

const SingleComment = ({
  review,
  locale,
  user_id,
}: {
  review: Comment;
  locale: string;
  user_id: string | undefined;
}) => {
  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(true);
  const [isCommentDeletePending, startDeleteCommentTransition] =
    useTransition();

  const [state, formAction, isPending] = useActionState(
    editCommentAction,
    null
  );

  const handleDeleteComment = () => {
    startDeleteCommentTransition(async () => {
      const formData = new FormData();
      formData.append('id', review.id);
      formData.append('user_id', user_id!);
      const res = await deleteCommentAction(formData);

      const { status, message } = res;
      if (status === 'success') {
        toast.success(message);
      }
      if (status === 'failure') {
        toast.error(message);
      }
    });
  };

  useEffect(() => {
    if (state) {
      const { status, message } = state;
      if (status === 'success') {
        toast.success(message);
        setIsEditDisabled(true);
      }
      if (status === 'failure') {
        toast.error(message);
        setIsEditDisabled(true);
      }
    }
  }, [state]);

  return (
    <li className="mb-3 border rounded p-2">
      <div>
        <div className="d-flex gap-2">
          <Image src={review.product.images[0]} width={50} height={50} alt="" />
          <div className="d-flex flex-column align-items-center">
            <h6>{review.product.title}</h6>
            <span>{getPriceDisplay(review.product.price)}</span>
          </div>
        </div>
        <form action={formAction}>
          <input name="id" hidden readOnly value={review.id} />
          <textarea
            name="comment"
            className="w-100 h-auto form-control form-control_gray mb-4"
            cols={30}
            rows={8}
            defaultValue={review.comment}
            disabled={isPending}
            readOnly={isEditDisabled}></textarea>
          <div className="d-flex justify-content-between">
            <span>{formattedDate(review.created_at, locale)}</span>
            <div className="d-flex">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setIsEditDisabled((prev) => !prev)}>
                {isEditDisabled ? 'Edit' : 'Cancel Edit'}
              </button>

              <button
                hidden={isEditDisabled}
                className="btn btn-success"
                type="submit"
                disabled={isEditDisabled}>
                Save
              </button>

              <button
                hidden={!isEditDisabled}
                type="button"
                className="btn btn-danger"
                disabled={isCommentDeletePending}
                onClick={handleDeleteComment}>
                {' '}
                Delete{' '}
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>
  );
};

export default SingleComment;
