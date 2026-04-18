import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function syncCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;

  const existing = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (existing) return existing;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || null;

  return prisma.user.create({
    data: {
      clerkId: userId,
      email,
      name,
    },
  });
}

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;
  return prisma.user.findUnique({ where: { clerkId: userId } });
}
