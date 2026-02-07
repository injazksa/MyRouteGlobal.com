import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'en'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. استثناء الملفات العامة وملفات النظام
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // 2. التحقق مما إذا كان المسار يحتوي بالفعل على لغة مدعومة
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // 3. إعادة التوجيه إلى اللغة الافتراضية مع الحفاظ على المسار
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  
  // استخدام rewrite بدلاً من redirect لتجنب تغيير الرابط في المتصفح إذا كان ذلك مفضلاً، 
  // ولكن هنا نستخدم redirect لضمان وضوح اللغة في الرابط
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // استثناء المسارات التي لا يجب معالجتها
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
