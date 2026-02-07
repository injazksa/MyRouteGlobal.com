import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // التحقق مما إذا كان المسار يحتوي بالفعل على لغة مدعومة
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // استثناء الملفات العامة (public) وملفات النظام
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // إعادة التوجيه إلى اللغة الافتراضية
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // استثناء المسارات التي لا يجب معالجتها
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
