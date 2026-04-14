'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { TbEye } from 'react-icons/tb';
import { Product } from '../types/product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showAddToCart = false }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="group w-full">
      {/* Image container */}
      <div className="relative bg-secondary rounded-lg overflow-hidden aspect-square">
        {/* Badges */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded z-10">
            -{product.discount}%
          </div>
        )}
        {product.isNew && !product.discount && (
          <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded z-10">
            NEW
          </div>
        )}

        {/* Action icons */}
        <div className="absolute top-3 right-3 space-y-2 z-10">
          <button
            className="bg-white rounded-full p-2 shadow-sm cursor-pointer hover:bg-red-50 transition block"
            onClick={handleWishlistToggle}
          >
            {inWishlist ? (
              <IoMdHeart className="text-lg text-primary" />
            ) : (
              <IoMdHeartEmpty className="text-lg" />
            )}
          </button>
          <Link
            href={`/products/${product.id}`}
            className="bg-white rounded-full p-2 shadow-sm cursor-pointer hover:bg-gray-100 transition block"
          >
            <TbEye className="text-lg" />
          </Link>
        </div>

        {/* Product image */}
        <Link href={`/products/${product.id}`} className="block p-8">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Add to cart overlay */}
        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            className={`absolute bottom-0 left-0 right-0 py-3 text-sm font-medium text-center transition-all duration-300 ${
              inCart
                ? 'bg-gray-800 text-white'
                : 'bg-black text-white translate-y-full group-hover:translate-y-0'
            }`}
            disabled={inCart}
          >
            {inCart ? 'Added to Cart' : 'Add To Cart'}
          </button>
        )}
      </div>

      {/* Product info */}
      <div className="mt-4 space-y-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-sm hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-primary font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="line-through text-gray-400 text-sm">
              ${product.originalPrice}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex text-yellow-400 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="text-gray-400 text-xs">({product.reviews})</span>
        </div>
        {product.colors && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border-2 border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
