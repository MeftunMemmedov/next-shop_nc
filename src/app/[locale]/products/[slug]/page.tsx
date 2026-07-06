import ProductDetails from '@/(pages)/ProductDetails';
import { apikey, baseURL } from '@/api';
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
  const products = (await fetch(`${baseURL}shop_products`, {
    headers: {
      apikey: apikey!,
      Authorization: `Bearer ${apikey}`,
    },
  }).then((res) => res.json())) as Product[];

  return products.map((product) => ({ slug: product.slug }));
};

const ProductDetailsPage = async ({ params }: PageProps) => {
  const { slug, locale } = await params;

  if (!slug) notFound();
  return (
    <ProductDetails
      slug={slug}
      locale={locale}
      productFetch={() => getProductDetails(slug)}
    />
  );
};

export default ProductDetailsPage;
