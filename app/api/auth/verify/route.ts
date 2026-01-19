import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAuthCookieName, verifyAdminSession } from '@/lib/auth';

export async function GET() {
  const cookieName = getAuthCookieName();
  const token = (await cookies()).get(cookieName)?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const session = await verifyAdminSession(token);
    return NextResponse.json({ authenticated: true, session });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}


