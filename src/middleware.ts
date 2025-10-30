import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr', 'mg'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

   // ✅ Servir les assets statiques directement
  if (pathname.startsWith('/img/') || pathname.startsWith('/_next/') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  // Vérifier si le pathname contient déjà une locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Détection de la langue depuis les cookies ou headers
  let locale = defaultLocale;
  
  // Vérifier le cookie de langue
  const cookieLang = request.cookies.get('lang')?.value;
  if (cookieLang && locales.includes(cookieLang)) {
    locale = cookieLang;
  } 
  // Sinon vérifier le header Accept-Language
  else {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      for (const loc of locales) {
        if (acceptLanguage.includes(loc)) {
          locale = loc;
          break;
        }
      }
    }
  }

  // Rediriger vers la langue détectée
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|images|icons|sw.js|site.webmanifest).*)',
  ],
};