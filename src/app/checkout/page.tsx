'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for shopping with Exclusive.');
    clearCart();
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-black transition">Cart</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Checkout</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">Billing Details</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-500 mb-2">First Name *</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Company Name</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Street Address *</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Apartment, floor, etc. (optional)</label>
              <input
                type="text"
                value={form.apartment}
                onChange={(e) => setForm({ ...form, apartment: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Town/City *</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Phone Number *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-2">Email Address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-secondary rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
                required
              />
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded relative shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <span className="text-sm truncate max-w-[180px]">{item.name}</span>
                  </div>
                  <span className="font-medium text-sm">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal:</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm pb-3 border-b border-gray-200">
                <span className="text-gray-500">Shipping:</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Payment method */}
            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm">Bank</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm">Cash on delivery</span>
              </label>
            </div>

            {/* Coupon */}
            <div className="flex gap-3 mt-6">
              <input
                type="text"
                placeholder="Coupon Code"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
              />
              <button type="button" className="btn-primary text-sm whitespace-nowrap">
                Apply Coupon
              </button>
            </div>

            <button type="submit" className="btn-primary w-full mt-6">
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
