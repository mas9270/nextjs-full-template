// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

export default createMiddleware(routing);

export const config = {
  // این Regex تمام روت‌ها بجای فایل‌های استاتیک و API را مچ می‌کند
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
