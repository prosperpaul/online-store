'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '../data/products';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import { TbTruckDelivery } from 'react-icons/tb';
import { RiCustomerService2Line } from 'react-icons/ri';
import { GoShieldCheck } from 'react-icons/go';
import { IoPhonePortraitOutline, IoHeadsetOutline, IoGameControllerOutline } from 'react-icons/io5';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { BsSmartwatch, BsCamera } from 'react-icons/bs';

const categories = [
  { name: "Phone", icon: <IoPhonePortraitOutline size={36} /> },
  { name: "Electronics", icon: <HiOutlineComputerDesktop size={36} /> },
  { name: "Fashion", icon: <BsSmartwatch size={36} /> },
  { name: "Gaming", icon: <IoGameControllerOutline size={36} /> },
  { name: "Beauty", icon: <BsCamera size={36} /> },
  { name: "Sports", icon: <IoHeadsetOutline size={36} /> },
];

const sidebarCategories = [
  "Electronics",
  "Fashion",
  "Furniture",
  "Gaming",
  "Beauty",
  "Pets",
  "Sports",
  "Toys",
];

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [flashPage, setFlashPage] = useState(0);

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const diff = new Date('2026-12-31T23:59:59').getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.discount);
  const bestSellers = products.filter((p) => p.reviews > 60).slice(0, 4);
  const exploreProducts = products.slice(8, 16);
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <div className="flex gap-8">
          {/* Sidebar categories - desktop */}
          <aside className="hidden lg:block w-56 shrink-0 border-r border-gray-200 pr-6">
            <ul className="space-y-3 pt-2">
              {sidebarCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${cat}`}
                    className="text-sm hover:text-primary transition-colors flex items-center justify-between group"
                  >
                    {cat}
                    <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {/* Hero banner */}
          <div className="flex-1 bg-black text-white rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-6">
              <div className="space-y-4 md:max-w-[50%]">
                <div className="flex items-center gap-3">
                  <Image src="/images/Frame 610.png" alt="" width={40} height={40} />
                  <span className="text-sm text-gray-300">Latest Collection</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  Up to 10% off Voucher
                </h1>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium border-b border-white pb-1 hover:text-primary hover:border-primary transition-colors"
                >
                  Shop Now <FaArrowRight />
                </Link>
              </div>
              <div className="md:max-w-[45%]">
                <Image
                  src="/images/hero_endframe.png"
                  alt="Hero product"
                  width={400}
                  height={400}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FLASH SALES ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="section-heading">
          <div className="section-heading-bar" />
          <span className="section-heading-text">Today&apos;s</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="flex items-center gap-6 flex-wrap">
            <h2 className="section-title">Flash Sales</h2>
            {mounted && (
              <div className="flex items-center gap-3">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Min', value: timeLeft.minutes },
                  { label: 'Sec', value: timeLeft.seconds },
                ].map((t, i) => (
                  <div key={t.label} className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-[10px] font-medium text-gray-500 uppercase">{t.label}</p>
                      <p className="text-2xl md:text-3xl font-bold">{pad(t.value)}</p>
                    </div>
                    {i < 3 && <span className="text-primary text-2xl font-bold">:</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFlashPage((p) => Math.max(0, p - 1))}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FaArrowLeft className="text-sm" />
            </button>
            <button
              onClick={() => setFlashPage((p) => Math.min(Math.ceil(flashProducts.length / 4) - 1, p + 1))}
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {flashProducts.slice(flashPage * 4, flashPage * 4 + 4).map((product) => (
            <ProductCard key={product.id} product={product} showAddToCart />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-primary inline-block">
            View All Products
          </Link>
        </div>

        <hr className="mt-16" />
      </section>

      {/* ===== BROWSE BY CATEGORY ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="section-heading">
          <div className="section-heading-bar" />
          <span className="section-heading-text">Categories</span>
        </div>
        <h2 className="section-title mb-8">Browse By Category</h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-200 rounded-lg hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group"
            >
              <div className="text-gray-600 group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          ))}
        </div>

        <hr className="mt-16" />
      </section>

      {/* ===== BEST SELLING ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="section-heading">
          <div className="section-heading-bar" />
          <span className="section-heading-text">This Month</span>
        </div>

        <div className="flex items-end justify-between mb-8">
          <h2 className="section-title">Best Selling Products</h2>
          <Link href="/products" className="btn-primary hidden sm:inline-block">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} showAddToCart />
          ))}
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-black text-white rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8">
            <div className="space-y-5 md:max-w-[45%]">
              <span className="text-green-400 font-semibold text-sm">Categories</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Enhance Your Music Experience
              </h2>
              {mounted && (
                <div className="flex gap-3">
                  {[
                    { label: 'Hours', value: 23 },
                    { label: 'Days', value: 5 },
                    { label: 'Minutes', value: 59 },
                    { label: 'Seconds', value: 35 },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="w-16 h-16 bg-white/10 rounded-full flex flex-col items-center justify-center"
                    >
                      <span className="text-sm font-bold">{pad(t.value)}</span>
                      <span className="text-[9px] text-gray-400">{t.label}</span>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/products" className="inline-block bg-green-500 text-white px-8 py-3 rounded font-medium hover:bg-green-600 transition">
                Buy Now!
              </Link>
            </div>
            <div className="md:max-w-[50%]">
              <Image
                src="/images/jambox.png"
                alt="JBL Speaker"
                width={500}
                height={400}
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXPLORE OUR PRODUCTS ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="section-heading">
          <div className="section-heading-bar" />
          <span className="section-heading-text">Our Products</span>
        </div>

        <div className="flex items-end justify-between mb-8">
          <h2 className="section-title">Explore Our Products</h2>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-gray-200 transition">
              <FaArrowLeft className="text-sm" />
            </button>
            <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-gray-200 transition">
              <FaArrowRight className="text-sm" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {exploreProducts.map((product) => (
            <ProductCard key={product.id} product={product} showAddToCart />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-primary inline-block">
            View All Products
          </Link>
        </div>
      </section>

      {/* ===== NEW ARRIVAL ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="section-heading">
          <div className="section-heading-bar" />
          <span className="section-heading-text">Featured</span>
        </div>
        <h2 className="section-title mb-8">New Arrival</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px]">
          {/* Large card */}
          <div className="bg-black text-white rounded-lg p-8 flex flex-col justify-end relative overflow-hidden min-h-[300px]">
            <Image
              src="/images/Frame 876.png"
              alt="PlayStation 5"
              fill
              className="object-contain object-center p-4 opacity-80"
            />
            <div className="relative z-10 mt-auto">
              <h3 className="text-2xl font-bold">PlayStation 5</h3>
              <p className="text-gray-400 text-sm mt-1 mb-3">
                Black and White version of the PS5 coming out on sale.
              </p>
              <Link href="/products" className="text-sm font-medium border-b border-white pb-0.5 hover:text-primary hover:border-primary transition">
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-rows-2 gap-4">
            {/* Top */}
            <div className="bg-gray-900 text-white rounded-lg p-8 flex items-end relative overflow-hidden min-h-[150px]">
              <Image
                src="/images/attractive-woman.png"
                alt="Women Collection"
                fill
                className="object-cover object-top opacity-70"
              />
              <div className="relative z-10">
                <h3 className="text-xl font-bold">Women&apos;s Collections</h3>
                <p className="text-gray-400 text-sm mt-1 mb-2">
                  Featured woman collections that give you another vibe.
                </p>
                <Link href="/products" className="text-sm font-medium border-b border-white pb-0.5 hover:text-primary hover:border-primary transition">
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 text-white rounded-lg p-6 flex flex-col justify-end relative overflow-hidden min-h-[150px]">
                <Image
                  src="/images/speakers.png"
                  alt="Speakers"
                  fill
                  className="object-contain object-center p-6 opacity-80"
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold">Speakers</h3>
                  <p className="text-gray-400 text-xs mt-1 mb-2">Amazon wireless speakers</p>
                  <Link href="/products" className="text-xs font-medium border-b border-white pb-0.5 hover:text-primary hover:border-primary transition">
                    Shop Now
                  </Link>
                </div>
              </div>
              <div className="bg-gray-900 text-white rounded-lg p-6 flex flex-col justify-end relative overflow-hidden min-h-[150px]">
                <Image
                  src="/images/perfume.png"
                  alt="Perfume"
                  fill
                  className="object-contain object-center p-6 opacity-80"
                />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold">Perfume</h3>
                  <p className="text-gray-400 text-xs mt-1 mb-2">GUCCI INTENSE OUD EDP</p>
                  <Link href="/products" className="text-xs font-medium border-b border-white pb-0.5 hover:text-primary hover:border-primary transition">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <TbTruckDelivery size={32} />,
              title: 'FREE AND FAST DELIVERY',
              desc: 'Free delivery for all orders over $140',
            },
            {
              icon: <RiCustomerService2Line size={32} />,
              title: '24/7 CUSTOMER SERVICE',
              desc: 'Friendly 24/7 customer support',
            },
            {
              icon: <GoShieldCheck size={32} />,
              title: 'MONEY BACK GUARANTEE',
              desc: 'We return money within 30 days',
            },
          ].map((service) => (
            <div key={service.title} className="flex flex-col items-center text-center gap-3">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                  {service.icon}
                </div>
              </div>
              <h3 className="font-bold text-sm">{service.title}</h3>
              <p className="text-gray-500 text-xs">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
