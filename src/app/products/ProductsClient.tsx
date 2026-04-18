'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import type { Product } from '../../types/product';
import Link from 'next/link';

export default function ProductsClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.trim().toLowerCase() ?? '';
  const categoryParam = searchParams.get('category') ?? 'All';

  const allCategories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('default');

  const bySearch = searchQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery),
      )
    : products;

  const filtered =
    selectedCategory === 'All'
      ? bySearch
      : bySearch.filter((p) => p.category === selectedCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Products</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <h3 className="font-bold text-lg mb-4">Categories</h3>
          <ul className="space-y-1">
            {allCategories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm transition ${
                    selectedCategory === cat
                      ? 'bg-primary text-white font-medium'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className="text-xs ml-1 opacity-60">
                      ({products.filter((p) => p.category === cat).length})
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {searchQuery ? (
                <>
                  Found <span className="font-medium text-black">{sorted.length}</span> results for{' '}
                  <span className="font-medium text-black">&quot;{searchQuery}&quot;</span>
                </>
              ) : (
                <>
                  Showing <span className="font-medium text-black">{sorted.length}</span> products
                </>
              )}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} showAddToCart />
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {searchQuery
                  ? `No products match "${searchQuery}".`
                  : 'No products found in this category.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
