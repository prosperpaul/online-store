import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { CartProvider } from '../context/CartContext';

export const metadata: Metadata = {
  title: 'Exclusive - Premium Online Store',
  description: 'Shop the latest products at great prices. Free delivery on orders over $140.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
