'use client';
import Spinner from '@/components/Spinner';
import dynamic from 'next/dynamic';

const Form = dynamic(() => import('./component/Form'), {
  ssr: false,
  loading: () => <Spinner />,
});
const CommentForm = ({ slug }: { slug: string }) => {
  return <Form slug={slug} />;
};

export default CommentForm;
