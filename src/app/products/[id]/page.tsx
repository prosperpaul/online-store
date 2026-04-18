import Link from 'next/link';
import { getProductById, getProductsByCategory } from '@/lib/products';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products" className="btn-primary">Back to Products</Link>
      </div>
    );
  }

  const sameCategory = await getProductsByCategory(product.category);
  const relatedProducts = sameCategory.filter((p) => p.id !== product.id).slice(0, 4);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
