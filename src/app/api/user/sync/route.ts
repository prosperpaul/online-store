import { NextResponse } from 'next/server';
import { syncCurrentUser } from '@/lib/user';

export async function POST() {
  const user = await syncCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  return NextResponse.json({ user });
}
