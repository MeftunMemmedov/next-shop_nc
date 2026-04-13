'use client';
import { Link } from '@/i18n/routing';
import { useEffect } from 'react';

interface Props {
  title?: string;
  message?: string;
}

const defaultTitle = 'Page not found';
const defaultMessage = 'The page you are looking for was not found.';
const NotFound = ({
  title = defaultTitle,
  message = defaultMessage,
}: Props) => {
  useEffect(() => {
    document.body.classList.toggle('not-found-page', true);

    return () => {
      document.body.classList.toggle('not-found-page', false);
    };
  }, []);
  return (
    <section className="page-not-found">
      <div className="content container d-flex flex-column align-items-center">
        <h2 className="mb-3">404</h2>
        <h3 className="mb-3">{title}</h3>
        <p className="mb-3">{message}</p>
        <Link
          href="/"
          className="btn btn-primary d-flex justify-content-center align-items-center"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
