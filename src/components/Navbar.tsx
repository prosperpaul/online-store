'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import Navicons from './Navicons';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
  { href: '/signup', label: 'Sign Up' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <header className="bg-white text-black sticky top-0 z-50 border-b border-gray-100">
      {/* Top banner */}
      <div className="bg-black text-white text-sm py-2 text-center overflow-hidden">
        <p className="animate-marquee whitespace-nowrap">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
          <Link href="/products" className="underline font-semibold ml-2">
            Shop Now
          </Link>
        </p>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            Exclusive
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search + Icons */}
          <div className="flex items-center gap-4">
            {/* Search bar - desktop */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 gap-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-48 lg:w-56"
              />
              <IoIosSearch className="text-xl text-gray-500" />
            </div>

            <Navicons />

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-2xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <IoMdClose /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3">
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 gap-2 mb-4 md:hidden">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
              <IoIosSearch className="text-xl text-gray-500" />
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-2 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
