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
          width={120}
          height={30}
          className="logo__image d-block"
          priority
          fetchPriority="high"
        />
      </Link>
    </div>
  );
};

export default Logo;
