import Products from '@/(pages)/Products';
import { getPageTitle } from '@/helpers';
import { createMetadata } from '@/helpers/metadata';
import { FilterParams } from '@/types';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return createMetadata({
    title: getPageTitle('Products'),
    locale,
    path: '/products',
  });
};

interface PageProps {
  searchParams: Promise<FilterParams>;
}

const ProductsPage = async ({ searchParams }: PageProps) => {
  return <Products searchParams={searchParams} />;
};

export default ProductsPage;
