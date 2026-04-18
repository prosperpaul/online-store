import { prisma } from './prisma';
import type { Product } from '../types/product';

type DbProduct = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description: string | null;
  inStock: boolean;
  colors: string[];
  isNew: boolean;
};

function toProduct(p: DbProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice ?? undefined,
    discount: p.discount ?? undefined,
    image: p.image,
    rating: p.rating,
    reviews: p.reviews,
    category: p.category,
    description: p.description ?? undefined,
    inStock: p.inStock,
    colors: p.colors.length > 0 ? p.colors : undefined,
    isNew: p.isNew || undefined,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return products.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const product = await prisma.product.findUnique({ where: { id } });
  return product ? toProduct(product) : null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { category },
    orderBy: { createdAt: 'asc' },
  });
  return products.map(toProduct);
}
