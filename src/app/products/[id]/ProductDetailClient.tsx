'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Product } from '../../../types/product';
import { useCart } from '../../../context/CartContext';
import ProductCard from '../../../components/ProductCard';
import { TbTruckDelivery, TbRefresh } from 'react-icons/tb';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const inCart = isInCart(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-black transition">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{product.name}</span>
      </div>

      {/* Product detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 bg-secondary rounded-lg p-2 shrink-0 transition ${
                  selectedImage === i ? 'border-2 border-primary' : 'border-2 border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 bg-secondary rounded-lg p-8 flex items-center justify-center aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain max-h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-400 text-sm">({product.reviews} Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className={`text-sm ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="bg-primary text-white text-sm px-2 py-0.5 rounded">-{product.discount}%</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6 pb-6 border-b border-gray-200">
            {product.description || `Premium quality ${product.name.toLowerCase()} from the ${product.category} category. Designed for performance and built to last. One of our most popular items with ${product.reviews} customer reviews.`}
          </p>

          {/* Colors */}
          {product.colors && (
            <div className="flex items-center gap-3 mb-6">
              <span className="text-sm font-medium">Colours:</span>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 hover:scale-110 transition"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-11 flex items-center justify-center hover:bg-gray-100 transition rounded-l-lg text-lg"
              >
                -
              </button>
              <span className="w-16 text-center font-medium border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-11 flex items-center justify-center hover:bg-gray-100 transition rounded-r-lg text-lg"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                for (let i = 0; i < quantity; i++) addToCart(product);
              }}
              disabled={inCart}
              className={`flex-1 py-3 rounded-lg font-medium transition text-sm ${
                inCart
                  ? 'bg-gray-200 text-gray-500 cursor-default'
                  : 'bg-primary text-white hover:bg-red-600'
              }`}
            >
              {inCart ? 'Already in Cart' : 'Buy Now'}
            </button>
          </div>

          {/* Delivery info */}
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
            <div className="flex items-center gap-4 p-4">
              <TbTruckDelivery size={28} />
              <div>
                <p className="font-medium text-sm">Free Delivery</p>
                <p className="text-xs text-gray-500">Enter your postal code for delivery availability</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <TbRefresh size={28} />
              <div>
                <p className="font-medium text-sm">Return Delivery</p>
                <p className="text-xs text-gray-500">Free 30 days delivery returns. <Link href="/about" className="underline">Details</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="section-heading-bar" />
            <h2 className="section-title">Related Items</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} showAddToCart />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
