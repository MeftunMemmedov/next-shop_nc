import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const access = request.cookies.get('access')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoute = pathname.split('/')[2];
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'en';
  if (!access && protectedRoute === 'account') {
    return NextResponse.redirect(
      new URL(`/${locale}/auth/signin`, request.url)
    );
  }

  if (access && protectedRoute === 'auth') {
    return NextResponse.redirect(
      new URL(`/${locale}/account/details`, request.url)
    );
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(az|en)/:path*',
    '/((?!api|_next|.*\\..*).*)',
    '/account/:path*',
    '/auth/:path*',
  ],
};
