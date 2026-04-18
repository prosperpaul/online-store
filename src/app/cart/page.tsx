'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { IoClose } from 'react-icons/io5';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
        }),
      });

      if (res.status === 401) {
        window.location.href = '/login';
        return;
      }

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Checkout failed');
        setLoading(false);
      }
    } catch (err) {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🛒</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/products" className="btn-primary inline-block">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Cart</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b text-sm font-medium text-gray-500">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-center">Subtotal</div>
          </div>

          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-5">
                {/* Product */}
                <div className="md:col-span-5 flex items-center gap-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition shrink-0"
                  >
                    <IoClose size={20} />
                  </button>
                  <div className="w-16 h-16 bg-secondary rounded-lg relative shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.category}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="md:col-span-2 text-center">
                  <span className="md:hidden text-sm text-gray-500">Price: </span>
                  <span className="font-medium">${item.price}</span>
                </div>

                {/* Quantity */}
                <div className="md:col-span-3 flex items-center justify-center">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="md:col-span-2 text-center">
                  <span className="md:hidden text-sm text-gray-500">Subtotal: </span>
                  <span className="font-semibold">${item.price * item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-3 pt-6">
            <Link href="/products" className="btn-outline text-center text-sm">
              Return To Shop
            </Link>
            <button onClick={clearCart} className="border border-red-200 text-red-500 px-6 py-3 rounded text-sm hover:bg-red-50 transition">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Cart total */}
        <div className="lg:col-span-1">
          <div className="border-2 border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-5">Cart Total</h2>
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Subtotal:</span>
                <span className="font-medium">${subtotal}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-500">Shipping:</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>${total}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="btn-primary block text-center w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Redirecting...' : 'Proceed to Checkout'}
            </button>
            {subtotal < 500 && (
              <p className="text-xs text-gray-400 mt-3 text-center">
                Add ${500 - subtotal} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
