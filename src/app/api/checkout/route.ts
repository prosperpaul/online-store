import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { syncCurrentUser } from '@/lib/user';
import { prisma } from '@/lib/prisma';

type CartItemInput = {
  id: string;
  quantity: number;
};

export async function POST(req: Request) {
  const user = await syncCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { items } = (await req.json()) as { items: CartItemInput[] };
  if (!items?.length) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const dbProducts = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.id) } },
  });

  if (dbProducts.length !== items.length) {
    return NextResponse.json({ error: 'Some products are no longer available' }, { status: 400 });
  }

  const lineItems = items.map((item) => {
    const product = dbProducts.find((p) => p.id === item.id)!;
    return {
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          images: product.image.startsWith('http')
            ? [product.image]
            : [],
          metadata: { productId: product.id },
        },
      },
    };
  });

  const subtotal = dbProducts.reduce((sum, p) => {
    const item = items.find((i) => i.id === p.id)!;
    return sum + p.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: subtotal,
      status: 'PENDING',
      items: {
        create: items.map((item) => {
          const product = dbProducts.find((p) => p.id === item.id)!;
          return {
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
          };
        }),
      },
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: user.email,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
    metadata: {
      orderId: order.id,
      userId: user.id,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
