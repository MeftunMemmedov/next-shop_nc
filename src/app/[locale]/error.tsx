'use client';
import { ErrorIcon } from '@/assets/images/icons';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface ErrorPageProps {
  error: Error;
  unstable_retry: () => void;
}

const Error = ({ error, unstable_retry }: ErrorPageProps) => {
  const pathname = usePathname();
  const locale = useLocale();
  return (
    <section className="page-not-found">
      <div className="content container d-flex flex-column align-items-center">
        <Image src={ErrorIcon} alt="" />
        <p className="mb-3 fs-3">{error.message}</p>
        <div className="d-flex gap-2 align-items-center">
          <button
            onClick={() => unstable_retry()}
            className="btn btn-warning d-flex justify-content-center align-items-center">
            Try Again
          </button>
          {!pathname.endsWith(`${locale}/`) && (
            <Link
              href="/"
              className="btn btn-primary d-flex justify-content-center align-items-center">
              Go home
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Error;
