'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import { RiMenu4Line } from 'react-icons/ri';
import Navicons from './Navicons';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
  { href: '/signup', label: 'Sign Up' },
];

const Navbar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    if (!q) return;
    setMobileOpen(false);
    router.push(`/products?search=${encodeURIComponent(q)}`);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 gap-2">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent outline-none text-sm w-48 lg:w-56"
              />
              <button type="submit" aria-label="Search" className="text-gray-500 hover:text-black transition">
                <IoIosSearch className="text-xl" />
              </button>
            </form>

            <Navicons />

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-2xl p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <IoMdClose /> : <RiMenu4Line />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 0 }}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile slide-in menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="text-lg font-bold">Menu</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-xl"
            aria-label="Close menu"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Mobile search */}
        <div className="px-5 pt-4 md:hidden">
          <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-lg px-4 py-2.5 gap-2">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
            />
            <button type="submit" aria-label="Search" className="text-gray-500 hover:text-black transition">
              <IoIosSearch className="text-xl" />
            </button>
          </form>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 px-4 text-sm font-medium hover:bg-gray-50 rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
