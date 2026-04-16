import Spinner from '@/components/Spinner';

const Loading = () => {
  return (
    <div
      style={{ height: '50vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner />
    </div>
  );
};

export default Loading;
