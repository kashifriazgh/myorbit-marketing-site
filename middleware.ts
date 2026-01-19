import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAuthCookieName, verifyAdminSession } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Allow login + create-user pages without auth
    if (pathname.startsWith('/dashboard/login') || pathname.startsWith('/dashboard/create-user')) {
      return NextResponse.next();
    }

    // Check for auth token in cookies
    const cookieName = getAuthCookieName();
    const authToken = request.cookies.get(cookieName)?.value;

    if (!authToken) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/dashboard/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Verify session token (Edge-safe JWT verification)
    try {
      // Note: this is async; middleware supports returning a Promise
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      return (async () => {
        await verifyAdminSession(authToken);
        return NextResponse.next();
      })();
    } catch {
      const loginUrl = new URL('/dashboard/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.set(cookieName, '', { maxAge: 0, path: '/' });
      return res;
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};

