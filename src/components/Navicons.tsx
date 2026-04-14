// components/Navicons.tsx
'use client';

import { FiUser } from 'react-icons/fi';
import { IoCartOutline } from 'react-icons/io5';
import { PiHeartStraightThin } from 'react-icons/pi';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RiShoppingBag4Line } from 'react-icons/ri';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaRegStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Navicons = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const router = useRouter();
  const { getCartCount, wishlist } = useCart();

  // Temporary
  const isLoggedIn = false;

  const handleUser = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    setIsUserOpen((prev) => !prev);
  };

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

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

      <FiUser className="cursor-pointer text-3xl" onClick={handleUser} />
      {isUserOpen && (
        <div className="absolute rounded-md top-12 right-0 p-4 text-sm bg-white shadow-lg z-50 w-48">
          <ul className="space-y-3">
            <li className="flex items-center gap-2 cursor-pointer hover:text-red-500">
              <FiUser size={20} />
              <span>My Account</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-red-500">
              <RiShoppingBag4Line size={20} />
              <span>My Orders</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-red-500">
              <AiOutlineCloseCircle size={20} />
              <span>My Cancellations</span>
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:text-red-500">
              <FaRegStar size={20} />
              <span>My Reviews</span>
            </li>
          </ul>
          <button className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navicons;