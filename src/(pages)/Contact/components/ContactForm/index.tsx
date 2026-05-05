'use client';
import { sendContactMessageAction } from '@/actions/contact';
import { ContactMessageInput, contactSchema } from '@/schemas/contact.schema';
import { useAppSelector } from '@/store/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const { info } = useAppSelector((store) => store.inventory.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      user_name: info?.user_name || '',
      email: info?.email || '',
      phone: '',
      note: '',
    },
  });

  const disabled = isLoading || isSubmitting;

  const onSubmit = handleSubmit(async (data: ContactMessageInput) => {
    const res = await sendContactMessageAction(data);

    const { status, message } = res;
    if (status === 'failure') {
      toast.error(message);
      return;
    }

    if (status === 'success') {
      toast.success(message);
      reset();
    }
  });
  return (
    <div className="contact-us__form">
      <form onSubmit={onSubmit} className="needs-validation">
        <h3 className="mb-5">Contact Us</h3>
        {errors.root && (
          <div className="border p-3 mb-4 bg-danger rounded text-light fw-bold">
            {errors.root.message}
          </div>
        )}
        <div className="form-floating mb-3">
          <input
            {...register('user_name')}
            id="user_name"
            disabled={disabled}
            className={`form-control ${errors.user_name ? 'border-danger' : ''}`}
          />
          <label htmlFor="user_name">Name</label>
          {errors.user_name && (
            <p className="text-danger">{errors.user_name.message}</p>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            {...register('email')}
            placeholder="+994xxxxxxxxx"
            id="email"
            disabled={disabled}
            className={`form-control ${errors.email ? 'border-danger' : ''}`}
          />
          <label htmlFor="email">Email</label>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="form-floating mb-3">
          <input
            {...register('phone')}
            id="phone"
            disabled={disabled}
            className={`form-control ${errors.phone ? 'border-danger' : ''}`}
          />
          <label htmlFor="phone">Phone</label>
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>

        <div className="my-4">
          <textarea
            {...register('note')}
            placeholder="Your message"
            disabled={disabled}
            className={`form-control ${false ? 'border-danger' : ''}`}
            cols={30}
            name="message"
            rows={8}></textarea>
          {errors.note && <p className="text-danger">{errors.note.message}</p>}
        </div>

        <div className="my-4">
          <button disabled={disabled} type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
