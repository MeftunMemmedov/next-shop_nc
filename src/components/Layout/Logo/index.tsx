import { LOGO } from '@/assets/images';
import { PROJECT_NAME } from '@/constants';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="logo">
      <Link href="/" scroll aria-label={`${PROJECT_NAME} home page`}>
        <Image
          src={LOGO}
          alt={PROJECT_NAME ?? ''}
          width={50}
          height={50}
          className="logo__image d-block object-fit-contain"
          priority
          fetchPriority="high"
        />
      </Link>
    </div>
  );
};

export default Logo;
