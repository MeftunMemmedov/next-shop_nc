import Image from 'next/image';
import { CSSProperties } from 'react';

const Icon = ({
  src,
  className,
  style,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  className?: string;
  style?: CSSProperties;
}) => {
  return <Image src={src} className={className ?? ''} style={style} alt="" />;
};

export default Icon;
