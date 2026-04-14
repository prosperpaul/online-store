'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Your message has been sent! We will get back to you soon.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Contact</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                  <FaPhone size={14} />
                </div>
                <h3 className="font-semibold">Call To Us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">We are available 24/7, 7 days a week.</p>
              <p className="text-sm font-medium">Phone: +8801611112222</p>
            </div>

            <hr />

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shrink-0">
                  <FaEnvelope size={14} />
                </div>
                <h3 className="font-semibold">Write To Us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-2">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-sm font-medium">customer@exclusive.com</p>
              <p className="text-sm font-medium">support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-secondary p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-secondary p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="bg-secondary p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
              <textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={8}
                className="w-full bg-secondary p-3 rounded-lg outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                required
              />
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
