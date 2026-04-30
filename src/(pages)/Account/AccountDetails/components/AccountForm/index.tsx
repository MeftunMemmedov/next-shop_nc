'use client';
import { useState } from 'react';

import { ArrowDownIcon } from '@/assets/images/icons';

import Spinner from '@/components/Spinner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditUserInput, editUserSchema } from '@/schemas/edituser.schema';
import { editUserAction } from '@/actions/auth/edituser';
import { updateUser } from '@/store/inventory';

const AccountForm = () => {
  const dispatch = useAppDispatch();
  const { info } = useAppSelector((store) => store.inventory.user);

  const [isEditDisabled, setIsEditDisabled] = useState<boolean>(true);
  const [isAccountFormActive, setIsAccountFormActive] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<EditUserInput>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      user_id: info?.user_id,
      email: info?.email,
      data: {
        user_name: info?.user_name,
      },
    },
  });

  const onSubmit = handleSubmit(async (data: EditUserInput) => {
    if (!info || isEditDisabled) return;
    const { user_name, email } = info;
    const res = await editUserAction(data, { user_name, email });

    const { status, message } = res;
    if (status === 'failure') {
      setError('root', { message });
      return;
    }

    if (status === 'success') {
      dispatch(
        updateUser({ user_name: data.data.user_name, email: data.email })
      );
      setSuccessMessage(message);
      setIsEditDisabled(true);
    }
  });

  return (
    <div style={{ transition: '1s all' }}>
      <div
        className="border-bottom p-3 d-flex justify-content-between align-items-center"
        style={{ cursor: 'pointer' }}
        onClick={() => setIsAccountFormActive(!isAccountFormActive)}
      >
        <h5>Account details</h5>
        <ArrowDownIcon
          style={{
            transform: `rotate(${isAccountFormActive ? '0' : '180deg'})`,
            transition: '.5s all',
          }}
        />
      </div>
      <div
        className="container overflow-hidden"
        style={{
          maxHeight: isAccountFormActive ? 1000 : 0,
          transition: '1s all',
        }}
      >
        <div className="row mt-3">
          <div className="col-lg-10">
            <div className="cp-signin-wrap border-0">
              <form onSubmit={onSubmit}>
                {errors.root && (
                  <div className="alert alert-danger" role="alert">
                    {errors.root.message}
                  </div>
                )}
                {successMessage !== '' && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <div className="row">
                  <div className="col-xl-6">
                    <div>
                      <label htmlFor="name">User Name</label>
                      <input
                        {...register('data.user_name')}
                        className={`form-control form-control_gray ${errors?.data?.user_name ? 'is-invalid  invalid-input' : ''}`}
                        disabled={isEditDisabled || isSubmitting}
                      />
                      {errors?.data?.user_name && (
                        <div className="invalid-feedback">
                          {errors.data.user_name.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="cp-input-field">
                      <label htmlFor="email">Email</label>
                      <input
                        {...register('email')}
                        className={`${errors.email ? 'border-danger' : ''} form-control form-control_gray`}
                        disabled={isEditDisabled || isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                {!isEditDisabled ? (
                  <div className="mt-5 mb-5 d-flex justify-content-around">
                    <button
                      type="submit"
                      className="btn btn-primary w-50 text-center text-uppercase me-2"
                      disabled={isEditDisabled || isSubmitting}
                    >
                      {isSubmitting ? <Spinner size={15} /> : 'Submit'}
                    </button>
                    <button
                      className="btn btn-primary w-50 text-uppercase"
                      onClick={() => setIsEditDisabled(true)}
                      disabled={isEditDisabled || isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
              </form>
              {isEditDisabled ? (
                <div
                  className="mt-5 mb-5"
                  onClick={() => setIsEditDisabled(false)}
                >
                  <button className="btn btn-primary w-50 text-uppercase">
                    Edit
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountForm;
