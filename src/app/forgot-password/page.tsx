'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoMailOutline, IoArrowBack, IoCheckmarkCircle } from 'react-icons/io5';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        {!submitted ? (
          <div>
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <IoMailOutline size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Forgot your password?</h1>
            <p className="text-gray-500 text-sm text-center mb-8">
              No worries! Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Reset Link
              </button>
            </form>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-black transition mt-6"
            >
              <IoArrowBack />
              Back to Login
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <IoCheckmarkCircle size={32} className="text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Check your email</h1>
            <p className="text-gray-500 text-sm mb-2">
              We&apos;ve sent a password reset link to:
            </p>
            <p className="font-semibold text-sm mb-6">{email}</p>
            <p className="text-gray-400 text-xs mb-8">
              Didn&apos;t receive the email? Check your spam folder or
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary hover:underline ml-1"
              >
                try another email address
              </button>
            </p>
            <Link href="/login" className="btn-primary inline-block">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
