import Products from '@/(pages)/Products';
import { FilterParams } from '@/types';

interface PageProps {
  searchParams: Promise<FilterParams>;
}

const ProductsPage = async ({ searchParams }: PageProps) => {
  return <Products searchParams={searchParams} />;
};

export default ProductsPage;
