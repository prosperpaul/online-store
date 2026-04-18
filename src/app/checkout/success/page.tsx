'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { HiCheckCircle } from 'react-icons/hi';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const cleared = useRef(false);

  useEffect(() => {
    if (cleared.current) return;
    cleared.current = true;
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <HiCheckCircle className="text-green-500 text-7xl mb-6" />
      <h1 className="text-3xl font-bold mb-3">Payment Successful!</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        Thank you for your order. A confirmation email is on its way to your inbox.
      </p>
      <div className="flex gap-3">
        <Link href="/orders" className="btn-primary">View My Orders</Link>
        <Link href="/products" className="btn-outline">Continue Shopping</Link>
      </div>
    </div>
  );
}
