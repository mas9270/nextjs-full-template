import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';
import { verifyToken } from './lib/auth';

const handleI18n = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ۱. اجرای i18n برای همه روت‌ها (بجز API)
  if (!pathname.startsWith('/api')) {
    const response = handleI18n(req);
    
    // ۲. منطق محافظت از روت‌های پنل مدیریت
    if (pathname.includes('/admin')) {
      const token = req.cookies.get('token')?.value;
      const user = token ? await verifyToken(token) : null;

      if (!user || user.role !== 'admin') {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/api/:path*'] 
};
