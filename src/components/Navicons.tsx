'use client';

import { useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';
import { PiHeartStraightThin } from 'react-icons/pi';
import Link from 'next/link';
import { UserButton, useUser } from '@clerk/nextjs';
import { useCart } from '../context/CartContext';

const Navicons = () => {
  const { getCartCount, wishlist } = useCart();
  const { isSignedIn, isLoaded } = useUser();
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  useEffect(() => {
    if (isSignedIn) {
      fetch('/api/user/sync', { method: 'POST' }).catch(() => {});
    }
  }, [isSignedIn]);

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Link href="/wishlist" className="relative cursor-pointer">
        <PiHeartStraightThin className="cursor-pointer text-3xl" />
        {wishlistCount > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {wishlistCount}
          </div>
        )}
      </Link>

      <Link href="/cart" className="relative cursor-pointer">
        <IoCartOutline className="cursor-pointer text-3xl" />
        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            {cartCount}
          </div>
        )}
      </Link>

      {isLoaded && isSignedIn ? (
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-8 h-8',
            },
          }}
        />
      ) : (
        <Link href="/login" aria-label="Log in">
          <FiUser className="cursor-pointer text-3xl" />
        </Link>
      )}
    </div>
  );
};

export default Navicons;
