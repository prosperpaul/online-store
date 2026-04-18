import Link from 'next/link';
import Image from 'next/image';
import { syncCurrentUser } from '@/lib/user';
import { prisma } from '@/lib/prisma';

export default async function OrdersPage() {
  const user = await syncCurrentUser();
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 min-h-[60vh] flex items-center justify-center">
        <Link href="/login" className="btn-primary">Sign in to view orders</Link>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">My Orders</span>
      </div>

      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">📦</span>
          </div>
          <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-500 mb-6">When you place an order, it will show up here.</p>
          <Link href="/products" className="btn-primary inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const statusColor = {
              PENDING: 'bg-yellow-100 text-yellow-700',
              PAID: 'bg-green-100 text-green-700',
              SHIPPED: 'bg-blue-100 text-blue-700',
              DELIVERED: 'bg-purple-100 text-purple-700',
              CANCELLED: 'bg-red-100 text-red-700',
            }[order.status];

            return (
              <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-gray-50 border-b text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">Order</span>
                    <span className="font-mono text-xs">#{order.id.slice(-8).toUpperCase()}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <div className="w-16 h-16 bg-secondary rounded-lg relative shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                        <p className="text-xs text-gray-400">Qty {item.quantity} × ${item.price}</p>
                      </div>
                      <div className="text-sm font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
