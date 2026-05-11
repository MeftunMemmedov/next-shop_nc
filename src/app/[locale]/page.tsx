import Home from '@/(pages)/Home';
import { Metadata } from 'next';
import { defaultMetadata } from './metadata';

export const metadata: Metadata = defaultMetadata;

const HomePage = () => {
  return <Home />;
};

export default HomePage;
