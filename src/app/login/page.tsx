'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      alert('Login successful!');
      router.push('/');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[80vh] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
        {/* Image */}
        <div className="hidden md:block">
          <Image
            src="/images/Side Image.png"
            alt="Shopping"
            width={600}
            height={600}
            className="object-contain rounded-lg"
          />
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2">Log in to Exclusive</h1>
          <p className="text-gray-500 mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email or Phone Number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-3 outline-none focus:border-primary transition text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-3 outline-none focus:border-primary transition text-sm"
              required
            />

            <div className="flex items-center justify-between pt-2">
              <button type="submit" className="btn-primary">
                Log In
              </button>
              <Link href="/forgot-password" className="text-primary text-sm hover:underline">
                Forget Password?
              </Link>
            </div>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">OR</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition text-sm"
          >
            <Image src="/images/google (2).png" alt="Google" width={20} height={20} />
            <span>Log in with Google</span>
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
