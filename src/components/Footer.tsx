import Link from 'next/link';
import Image from 'next/image';
import { IoMdSend } from 'react-icons/io';
import { TiSocialFacebook } from 'react-icons/ti';
import { RiTwitterLine } from 'react-icons/ri';
import { IoLogoInstagram } from 'react-icons/io';
import { FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Exclusive */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <p className="text-sm font-medium mb-3">Subscribe</p>
            <p className="text-gray-400 text-sm mb-4">Get 10% off your first order</p>
            <div className="relative w-full max-w-[220px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent border border-gray-600 rounded py-2.5 pl-4 pr-10 text-sm outline-none focus:border-gray-400 transition"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition">
                <IoMdSend size={18} />
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-medium mb-4">Account</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/login" className="hover:text-white transition">My Account</Link></li>
              <li><Link href="/login" className="hover:text-white transition">Login / Register</Link></li>
              <li><Link href="/cart" className="hover:text-white transition">Cart</Link></li>
              <li><Link href="/wishlist" className="hover:text-white transition">Wishlist</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="font-medium mb-4">Quick Link</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Terms Of Use</Link></li>
              <li><Link href="/about" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-medium mb-4">Download App</h3>
            <p className="text-gray-400 text-xs mb-3">Save $3 with App New User Only</p>
            <div className="flex gap-2">
              <Image src="/images/google-play.png" alt="Google Play" width={110} height={40} className="object-contain" />
              <Image src="/images/dl.beatsnoop 1.png" alt="App Store" width={110} height={40} className="object-contain" />
            </div>
            <div className="flex items-center gap-4 mt-5 text-xl">
              <Link href="#" className="text-gray-400 hover:text-white transition"><TiSocialFacebook /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition"><RiTwitterLine /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition"><IoLogoInstagram /></Link>
              <Link href="#" className="text-gray-400 hover:text-white transition"><FaLinkedinIn /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <p className="text-center text-gray-500 text-xs py-4">
          &copy; Copyright Exclusive 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
