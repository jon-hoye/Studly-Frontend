import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login';
  const isHomePage = pathname === '/';

  // 1. Hvis brukeren ALLEREDE er logget inn:
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/bruker', request.url));
  }

  if (token && isHomePage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Hvis brukeren IKKE er logget inn og prøver å nå en beskyttet rute:
  if (!token && !isLoginPage && !isHomePage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Spesifiser hvilke ruter middleware skal overvåke
export const config = {
  matcher: [
    '/',       
    '/login',         
    '/dashboard/:path*',   
    '/bruker/:path*',  
    '/timeplan',
    '/fag',  
    '/kunngjoringer',
  ],
};
