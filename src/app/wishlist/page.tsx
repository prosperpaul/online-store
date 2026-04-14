'use client';

import Image from 'next/image';
import Link from 'next/link';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import ProductCard from '../../components/ProductCard';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => addToCart(item));
  };

  const recommendedProducts = products
    .filter((p) => !wishlist.find((w) => w.id === p.id))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Wishlist</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium">Wishlist ({wishlist.length})</h1>
        {wishlist.length > 0 && (
          <button
            onClick={handleMoveAllToBag}
            className="btn-outline text-sm"
          >
            Move All To Bag
          </button>
        )}
      </div>

      {/* Wishlist items */}
      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💝</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-500 mb-6">Save items you love for later.</p>
          <Link href="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {wishlist.map((item) => (
            <div key={item.id} className="group w-full">
              <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square">
                {item.discount && (
                  <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded z-10">
                    -{item.discount}%
                  </div>
                )}
                <button
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:bg-red-50 transition z-10"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <RiDeleteBin6Line className="text-lg text-red-500" />
                </button>
                <Link href={`/products/${item.id}`} className="block p-8">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full"
                  />
                </Link>
                <button
                  onClick={() => addToCart(item)}
                  className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 text-sm font-medium text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  Add To Cart
                </button>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-primary font-semibold">${item.price}</span>
                  {item.originalPrice && (
                    <span className="line-through text-gray-400 text-sm">${item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recommended products */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="section-heading-bar" />
            <h2 className="text-xl font-medium">Just For You</h2>
          </div>
          <Link href="/products" className="btn-outline text-sm">
            See All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} showAddToCart />
          ))}
        </div>
      </section>
    </div>
  );
}
