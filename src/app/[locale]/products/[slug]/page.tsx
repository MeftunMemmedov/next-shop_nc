import ProductDetails from '@/(pages)/ProductDetails';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (!slug) notFound();
  return <ProductDetails slug={slug} />;
};

export default ProductDetailsPage;
