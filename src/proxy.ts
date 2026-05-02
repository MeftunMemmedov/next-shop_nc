import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { refreshAccess } from './api/fetch/helpers/auth';

const intlMiddleware = createMiddleware(routing);

export const proxy = async (req: NextRequest) => {
  const response = intlMiddleware(req);

  let accessToken = req.cookies.get('access')?.value;
  const refreshToken = req.cookies.get('refresh')?.value;

  if (!accessToken && refreshToken) {
    try {
      const refreshRes = await refreshAccess(refreshToken);
      const { access_token, refresh_token, expires_in } = refreshRes;

      const cookieOptions: Partial<ResponseCookie> = {
        path: '/',
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      };

      response.cookies.set('access', access_token, {
        ...cookieOptions,
        maxAge: expires_in,
      });
      response.cookies.set('refresh', refresh_token, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7,
      });
      accessToken = access_token;
    } catch {
      const redirect = NextResponse.redirect(new URL('/', req.url));
      redirect.cookies.delete('access');
      redirect.cookies.delete('refresh');
      return redirect;
    }
  }

  const { pathname } = req.nextUrl;
  const protectedRoute = pathname.split('/')[2];
  const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en';

  if (!accessToken && protectedRoute === 'account') {
    return NextResponse.redirect(new URL(`/${locale}/auth/signin`, req.url));
  }

  if (accessToken && protectedRoute === 'auth') {
    return NextResponse.redirect(
      new URL(`/${locale}/account/details`, req.url)
    );
  }
  return response;
};

export const config = {
  matcher: [
    '/',
    '/(az|en)/:path*',
    '/((?!api|_next|.*\\..*).*)',
    '/account/:path*',
    '/auth/:path*',
  ],
};
