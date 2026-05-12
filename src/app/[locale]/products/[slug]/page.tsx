import ProductDetails from '@/(pages)/ProductDetails';
import { getDatalist } from '@/api/fetch/helpers/get';
import { getProduct } from '@/api/fetch/helpers/product';
import { getPageTitle } from '@/helpers';
import { createMetadata } from '@/helpers/metadata';
import { Product } from '@/types';
import { notFound } from 'next/navigation';
import { cache } from 'react';

const getProductDetails = cache((slug: string) => {
  return getProduct(slug);
});

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export const generateMetadata = async ({ params }: PageProps) => {
  const { locale, slug } = await params;

  const product = await getProductDetails(slug);

  return createMetadata({
    title: getPageTitle(product.title),
    description: product.description,
    path: `/products/${slug}`,
    locale,
    image: product.images[0],
  });
};

export const generateStaticParams = async () => {
  const products = await getDatalist<Product>('shop_products');

  return products.map((product) => ({ slug: product.slug }));
};

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { slug } = await params;

  if (!slug) notFound();
  return (
    <ProductDetails slug={slug} productFetch={() => getProductDetails(slug)} />
  );
};

export default ProductDetailsPage;
