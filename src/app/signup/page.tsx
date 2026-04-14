'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      alert('Account created successfully!');
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
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-gray-500 mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b-2 border-gray-200 py-3 outline-none focus:border-primary transition text-sm"
              required
            />
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

            <button type="submit" className="btn-primary w-full mt-2">
              Create Account
            </button>
          </form>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition text-sm mt-4"
          >
            <Image src="/images/google (2).png" alt="Google" width={20} height={20} />
            <span>Sign up with Google</span>
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
