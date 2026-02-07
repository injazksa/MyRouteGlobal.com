import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // استثناء الملفات العامة وملفات النظام فوراً
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // التحقق مما إذا كان المسار يحتوي بالفعل على لغة مدعومة
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // إعادة التوجيه إلى اللغة الافتراضية
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // استثناء المسارات التي لا يجب معالجتها
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
